import { OmitType } from '@nestjs/mapped-types';
import { Exclude } from 'class-transformer';
import { TodoDto } from './todo.dto';

@Exclude()
export class GetTodoDto extends OmitType(TodoDto, [] as const) {}
