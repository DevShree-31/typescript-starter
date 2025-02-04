import { Controller, Get, Post, Body, HttpException, HttpStatus, Req, Put, Param, UnauthorizedException, Delete } from '@nestjs/common';
import { TasksServices } from './tasks.service';
import { Task } from './task.model';
import { Request } from 'express';
import * as jwt from 'jsonwebtoken'
import { createReadStream } from 'fs';
import { title } from 'process';
interface customRequest extends Request{
  decoded?:any
}
@Controller('task')
export class TasksController {
  constructor(private readonly tasksService: TasksServices) {}

  @Get()
  findAll(): Promise<Task[]> {
    return this.tasksService.findAll();
  }
  @Get(':id')
  async getTaskById(
    @Param('id') taskId: number,
    @Req() req: customRequest,
  ): Promise<Task> {
    const user = req.decoded;

    const task = await this.tasksService.findById(taskId);

    if (!task) {
      throw new HttpException({ message: 'Task not found' }, HttpStatus.NOT_FOUND);
    }

    return task;
  }
  @Post()
async createToken(@Body() createTaskDbo:{title:string,description:string,assignedTo:number,assignedBy:number},@Req() req:customRequest):Promise<Task>{
    const user=req.decoded
    console.log(user)
        if(!createTaskDbo.title||!createTaskDbo.description){
          throw new HttpException({message:"These field cannot be null"},HttpStatus.BAD_REQUEST)
        }
        if(!createTaskDbo.assignedTo){
          return this.tasksService.createTask(createTaskDbo.title,createTaskDbo.description,user.id,user.id)
        }
       return this.tasksService.createTask(createTaskDbo.title,createTaskDbo.description,createTaskDbo.assignedTo,user.id)
}
@Put(':id')
  async updateTask(
    @Param('id') taskId: number,
    @Body() updateTaskDto: { title?: string; description?: string; assignedTo?: number },
    @Req() req: customRequest,req1:Request
  ): Promise<Task> {
    const user = req.decoded;
    if (!updateTaskDto.title && !updateTaskDto.description && !updateTaskDto.assignedTo) {
      throw new HttpException(
        { message: 'At least one field (title, description, assignedTo) must be provided' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const task = await this.tasksService.findById(taskId);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    
  if(task.assignedBy!=user.id){
    throw new UnauthorizedException({message:"Unauthorized access"})
  }
    if (updateTaskDto.title) task.title = updateTaskDto.title;
    if (updateTaskDto.description) task.description = updateTaskDto.description;
    if (updateTaskDto.assignedTo) task.assignedTo = updateTaskDto.assignedTo;
    return this.tasksService.updateTask(taskId, task);
  }
  @Delete(':id')
  async deleteTask(
    @Param('id') taskId: number,
    @Body() updateTaskDto: { title?: string; description?: string; assignedTo?: number },
    @Req() req: customRequest,req1:Request
  ): Promise<Task> {
    const user = req.decoded;
    if (!updateTaskDto.title && !updateTaskDto.description && !updateTaskDto.assignedTo) {
      throw new HttpException(
        { message: 'At least one field (title, description, assignedTo) must be provided' },
        HttpStatus.BAD_REQUEST,
      );
    }
    const task = await this.tasksService.findById(taskId);
    if (!task) {
      throw new HttpException('Task not found', HttpStatus.NOT_FOUND);
    }
    
  if(task.assignedBy!=user.id){
    throw new UnauthorizedException({message:"Unauthorized access"})
  }
    return this.tasksService.deleteTaskById(taskId);
  }
}
