import { IsString, MaxLength, IsNotEmpty, IsDate } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
  @IsString()
  @MaxLength(300)
  @ApiProperty()
  readonly description: string;
  @IsString()
  @MaxLength(20)
  @ApiProperty()
  readonly flag: string;
  // @IsDate()
  @ApiProperty()
  readonly created: Date;
  // @IsDate()
  @ApiProperty()
  readonly deadline: Date;
  @ApiProperty()
  readonly list: string;
}
