import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Task } from './task.model';
import { TasksServices } from './tasks.service';
import { TasksController } from './tasks.controller';

@Module({
  imports: [SequelizeModule.forFeature([Task])], // Register User model
  providers: [TasksServices],
  controllers: [TasksController],
})
export class TaskModule {}
