import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ChatModule } from './chat/chat.module';
import { UsersModule } from './users/users.module';
import { TodosModule } from './todos/todos.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://musa:mshn9615016@cluster0.kwrxx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    ChatModule,
    UsersModule,
    TodosModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
