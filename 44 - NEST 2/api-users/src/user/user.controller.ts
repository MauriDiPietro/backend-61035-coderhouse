import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ConflictException,
  Res,
  HttpStatus,
  NotFoundException,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response } from 'express';
import { RequestUser, UserLogin } from './types/user';
import { UserGuard } from './user.guard';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/register')
  @ApiResponse({ status: 200, description: 'User register OK' })
  @ApiResponse({ status: 409, description: 'User already registered' })
  @ApiBody({ type: CreateUserDto })
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<void> {
    try {
      const response = await this.userService.register(createUserDto);
      if (!response) throw new ConflictException('User already registered');
      else res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }

  @Post('/login')
  async login(@Body() user: UserLogin, @Res() res: Response): Promise<void> {
    try {
      const response = await this.userService.login(user);
      if(!response) throw new NotFoundException('Invalid Credentials');
      else res.status(HttpStatus.OK).json(response);
    } catch (error) {
      res.status(HttpStatus.NOT_FOUND).json({ message: error.message });
    }
  }

  @Get('/profile')
  @UseGuards(UserGuard)
  profile(@Request() req: RequestUser){
    return this.userService.profile(req);
  }

}
