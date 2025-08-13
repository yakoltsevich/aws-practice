import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private seq = 1;

  create(dto: CreateUserDto): User {
    const user: User = {
      id: this.seq++,
      name: dto.name,
      email: dto.email,
    };
    this.users.push(user);
    return user;
  }

  findAll(): User[] {
    return [...this.users];
  }
}
