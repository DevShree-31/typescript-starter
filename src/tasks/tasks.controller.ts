import { Controller, Get, Post, Body, HttpException, HttpStatus, Req } from '@nestjs/common';
import { TasksServices } from './tasks.service';
import { Task } from './task.model';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken'
import { createReadStream } from 'fs';
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksServices) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
  @Post('')
async createToken(@Body() createTaskDbo:{title:string,description:string,assignedTo:number,assignedBy:number},@Req() req:Request):Promise<Task>{
        console.log(createTaskDbo.description)
       return this.tasksService.createTask(createTaskDbo.title,createTaskDbo.description,createTaskDbo.assignedTo,createTaskDbo.assignedBy)
}

}
