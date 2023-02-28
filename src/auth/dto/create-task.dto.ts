import { IsString, MaxLength, IsNotEmpty, IsDate } from 'class-validator';

export class CreateTaskDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly title: string;
  @IsString()
  @MaxLength(300)
  readonly description: string;
  @IsString()
  @MaxLength(20)
  readonly flag: string;
  @IsDate()
  readonly created: Date;
  @IsDate()
  readonly deadline: Date;
}
