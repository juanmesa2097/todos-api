import { AdvanceQuery } from '@lib/dto/advance-result';
import { AdvanceResult } from '@lib/interfaces/advance-result';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { GetTodoDto } from './dto/get-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { TodosService } from './todos.service';

@Controller('todos')
export class TodosController {
  constructor(private readonly _todosService: TodosService) {}

  @Get()
  async getAll(
    @Query() advanceQuery: AdvanceQuery,
  ): Promise<AdvanceResult<GetTodoDto[]>> {
    return await this._todosService.getAll(advanceQuery);
  }

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<GetTodoDto> {
    return await this._todosService.create(createTodoDto);
  }

  @Put(':id')
  async update(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<GetTodoDto> {
    return await this._todosService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async deleteById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<GetTodoDto> {
    return await this._todosService.delete(id);
  }
}
