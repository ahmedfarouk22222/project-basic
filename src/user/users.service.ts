import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from './user-entity';
import { UserResponseDto } from './dtos/user-response.dto';

@Injectable()
export class UsersService {
  private users: UserEntity[] = [];
  createUser(user: UserEntity) {
    const newUser: UserEntity = {
      ...user,
      id: (this.users.length + 1).toString(),
    };
    this.users.push(newUser);
    return new UserResponseDto(newUser);
  }
  findAll(): UserEntity[] {
    return this.users;
  }
  findOne(id: string): UserEntity {
    const user = this.users.find((user) => user.id === id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }
  updateUser(
    id: string,
    updatedUser: Partial<UserEntity>,
  ): UserEntity | undefined {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return undefined;
    }
    this.users[userIndex] = { ...this.users[userIndex], ...updatedUser };
    return this.users[userIndex];
  }
  deleteUser(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);
    if (userIndex === -1) {
      return false;
    }
    this.users.splice(userIndex, 1);
    return true;
  }
}
