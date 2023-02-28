import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  readonly name: string;
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  readonly email: string;
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly password: string;
}
