import { hashSync, compareSync } from 'bcryptjs';
import { CreateUserDto } from '../dto/create-user.dto';

export const createHash = (password: string) => hashSync(password, 10);

export const isValidPassword = (password: string, user: CreateUserDto) =>
  compareSync(password, user.password);
