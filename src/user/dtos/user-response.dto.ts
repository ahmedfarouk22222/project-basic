import { Exclude } from 'class-transformer';
import { IsEmail, IsString } from 'class-validator';

export class UserResponseDto {
  @IsString()
  readonly username: string;
  @IsEmail()
  readonly email: string;
  @IsString()
  readonly country: string;
  @Exclude()
  readonly password: string;
  constructor(partial: Partial<UserResponseDto>) {
    Object.assign(this, partial);
  }
}
