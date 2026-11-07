import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserEntity } from './user-entity';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
@Controller('users')
export class UserController {
  private users: UserEntity[] = [];
  @Get()
  findAll(): UserEntity[] {
    return this.users;
  }
  @Post()
  createUser(@Body() createUserDto: CreateUserDto): UserEntity {
    const newUser: UserEntity = {
      ...createUserDto,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);

    return newUser;
  }
  @Get(':id')
  findOne(@Param('id') id: string): UserEntity | undefined {
    return this.users.find((user) => user.id === id);
  }
  @Patch(':id')
  updateUser(@Param('id') id: string): UserEntity | undefined {
    const index = this.users.findIndex((user) => user.id === id);
    // 2) update the element
    this.users[index] = { ...this.users[index], ...UpdateUserDto };

    return this.users[index];
  }
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
