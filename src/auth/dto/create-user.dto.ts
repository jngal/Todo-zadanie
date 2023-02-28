import { IsString, MaxLength, IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsString()
  @MaxLength(60)
  @ApiProperty()
  readonly name: string;
  @IsEmail()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
