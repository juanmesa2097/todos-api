import { OmitType } from '@nestjs/mapped-types';
import { TodoDto } from './todo.dto';

export class CreateTodoDto extends OmitType(TodoDto, [
  'id',
  'completed',
  'createdAt',
  'updatedAt',
] as const) {}
