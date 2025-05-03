import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user-dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(userDTO: CreateUserDTO) {
    const salt = await bcrypt.genSalt();
    userDTO.password = await bcrypt.hash(userDTO.password, salt);
    const user: Omit<CreateUserDTO & User, 'password'> & { password?: string } =
      await this.userRepository.save(userDTO);
    delete user.password;
    return user;
  }
}
