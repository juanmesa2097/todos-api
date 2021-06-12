import { Controller, Get } from '@nestjs/common';
import { GetUserDto } from './dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  async getAll(): Promise<GetUserDto[]> {
    return await this._usersService.getAll();
  }
}
