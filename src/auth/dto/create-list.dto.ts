import { IsString, MaxLength, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateListDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  @ApiProperty()
  readonly title: string;
  @ApiProperty()
  readonly tasks: object;
  @IsNotEmpty()
  @ApiProperty()
  readonly user: string;
}
