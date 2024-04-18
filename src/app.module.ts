import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AuthController } from './controllers/auth/auth.controller';
import {ConfigModule} from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TaskController } from './controllers/task/task.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TaskService } from './services/task.service';
import { TaskSchema } from './models/task.model';
import { TeamService } from './services/team.service';
import { TeamSchema } from './models/team.model';
import { TeamController } from './controllers/task/team.controller';


@Module({
  imports: [
    ConfigModule.forRoot(),   
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: process.env.EXPIRES_TIME },
    }),
    MongooseModule.forRoot(process.env.URL),
    MongooseModule.forFeature([{name: 'Task', schema: TaskSchema},{name: 'Team', schema: TeamSchema}]), 
  ],
  controllers: [AppController, AuthController, TaskController, TeamController],
  providers: [AppService, TaskService, TeamService],
})
export class AppModule {}
