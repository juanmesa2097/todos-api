import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import { mapQuery } from '@lib/utils/advance-result';
import { removeEmptyProps } from '@lib/utils/object';
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodoRepository } from './todos.repository';

@Injectable()
export class TodosService {
  constructor(
    private readonly _todoRepository: TodoRepository,
    private readonly _logger: Logger,
  ) {
    this._logger.setContext('TodosService');
  }

  async getAll(
    advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetTodoDto[]>> {
    this._logger.log("Request to fetch all ToDo's.");

    try {
      const [result, total] = await this._todoRepository.findAndCount(
        mapQuery(advanceQuery),
      );

      return {
        data: result.map((todo) => plainToClass(GetTodoDto, todo)),
        meta: { count: total },
      };
    } catch (err) {
      throw new BadRequestException(err.message);
    }
  }

  async create(createTodoDto: CreateTodoDto): Promise<GetTodoDto> {
    this._logger.log('Request to create a ToDo.');
    const newTodo = this._todoRepository.create(createTodoDto);
    await this._todoRepository.save(newTodo);
    return plainToClass(GetTodoDto, newTodo);
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<GetTodoDto> {
    this._logger.log(`Request to update ToDo by id: "${id}".`);

    const todo = await this._todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException('ToDo not found');
    }

    await this._todoRepository.save(
      Object.assign(todo, removeEmptyProps(updateTodoDto)),
    );

    return plainToClass(GetTodoDto, todo);
  }

  async delete(id: number): Promise<GetTodoDto> {
    this._logger.log(`Request to delete ToDo by id "${id}".`);

    const todo = await this._todoRepository.findOne(id);

    if (!todo) {
      throw new NotFoundException('ToDo not found');
    }

    await this._todoRepository.delete(id);

    return plainToClass(GetTodoDto, todo);
  }
}
