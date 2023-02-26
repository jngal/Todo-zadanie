import { Controller, Get, Query, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AppService } from './app.service';
import { GetCurrentUserById } from './utils/get-user-by-id.decorator';
import { JwtAuthGuard } from './utils/guards/jwt-guard.guard';

@Controller('/')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(@GetCurrentUserById() userId: number): string {
    console.log('getHello() controller', userId);
    return this.appService.getHello('Ján');
  }
}
