import { IsString, MaxLength, IsNotEmpty } from 'class-validator';

export class CreateListDto {
  @IsString()
  @MaxLength(100)
  @IsNotEmpty()
  readonly title: string;
}
