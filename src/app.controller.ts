import { Controller, Get, Post, UseGuards, Request } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { GetCurrentUserById } from './utils/get-user-by-id.decorator';
import { JwtAuthGuard } from './utils/guards/jwt-guard.guard';

@Controller('/')
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.body);
  }

  @Post('auth/register')
  async Register(@Request() req) {
    const user = {
      name: req.body?.name,
      email: req.body?.email,
      password: req.body?.password,
    };
    return this.userService.insertUser(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log('getHello() controller', userId);
    return this.appService.getHello('Ján');
  }
}
