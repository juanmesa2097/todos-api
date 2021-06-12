import { Exclude, Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

@Exclude()
export class TodoDto {
  @Expose()
  @IsNumber()
  id: number;

  @Expose()
  @IsNotEmpty()
  @IsString()
  @MaxLength(45)
  name: string;

  @Expose()
  @IsBoolean()
  completed: boolean;

  @Expose()
  @Type(() => Date)
  @IsDate()
  createdAt: Date;

  @Expose()
  @Type(() => Date)
  @IsDate()
  updatedAt: Date;
}
