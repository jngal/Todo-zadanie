import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './task/todo.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TodoModule,
    MongooseModule.forRoot(
      'mongodb+srv://jngal:xWaKUOPWpVhL1qpy@cluster0.zc98lli.mongodb.net/nestjs-demo?retryWrites=true&w=majority',
    ),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
