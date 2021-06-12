import { IntersectionType, PartialType, PickType } from '@nestjs/mapped-types';
import { CreateTodoDto } from './create-todo.dto';
import { TodoDto } from './todo.dto';

export class UpdateTodoDto extends PartialType(
  IntersectionType(CreateTodoDto, PickType(TodoDto, ['completed'] as const)),
) {}
