import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto, GetUserDto, LoginUserDto } from '../users/dto';
import { AuthService } from './auth.service';
import { LoginResult } from './interfaces';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<GetUserDto> {
    return await this._authService.signUp(createUserDto);
  }

  @Post('sign-in')
  async signIn(@Body() loginUserDto: LoginUserDto): Promise<LoginResult> {
    return await this._authService.signIn(loginUserDto);
  }
}
