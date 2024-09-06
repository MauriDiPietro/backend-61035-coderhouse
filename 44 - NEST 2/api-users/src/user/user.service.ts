import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './schema/user.schema';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { createHash, isValidPassword } from './utils/utils';
import { RequestUser, UserI, UserLogin } from './types/user';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    private JwtService: JwtService,
  ) {}

  async findByEmail(email: string): Promise<UserDocument | null> {
    return await this.UserModel.findOne({ email });
  }

  async register(createUserDto: CreateUserDto): Promise<UserDocument | null> {
    try {
      const { email, password } = createUserDto;
      const existUser = await this.findByEmail(email);
      if (!existUser) {
        return await this.UserModel.create({
          ...createUserDto,
          password: createHash(password),
        });
      }
      return null;
    } catch (error) {
      throw new Error(error);
    }
  }

  generateToken(user: UserDocument) {
    const payload = {
      first_name: user.first_name,
      last_name: user.last_name,
      role: user.role,
    };
    return this.JwtService.sign(payload);
  }

  async login(user: UserLogin): Promise<string | null> {
    try {
      const { email, password } = user;
      const existUser = await this.findByEmail(email);
      if (!existUser) return null;
      const passValid = isValidPassword(password, existUser);
      if (!passValid) return null;
      return this.generateToken(existUser);
    } catch (error) {
      throw new Error(error);
    }
  }

  profile(req: RequestUser) {
    try {
      return req.user;
    } catch (error) {
      throw new Error(error);
    }
  }
}
