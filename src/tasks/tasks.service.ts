import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import * as bcrypt from 'bcrypt'
import { hash } from 'crypto';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { stringify } from 'querystring';
import { Task } from './task.model';
dotenv.config()
@Injectable()
export class TasksServices {
  constructor(@InjectModel(Task) private taskModel: typeof Task) {}

  async findAll(): Promise<Task[]> {
    return this.taskModel.findAll();
  }
  async createTask(title:string,description:string,assignedTo:number,assignedBy:number):Promise<Task>{
    return this.taskModel.create({title,description,assignedTo,assignedBy})
  }
  async findById(id:number):Promise<Task>{
    return this.taskModel.findByPk(id)
  }
}
