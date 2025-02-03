import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './user.model';
import * as bcrypt from 'bcrypt'
import { hash } from 'crypto';
import * as jwt from 'jsonwebtoken'
import * as dotenv from 'dotenv'
import { stringify } from 'querystring';
dotenv.config()
@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser(name: string, email: string,password:string): Promise<User> {
    const createdUser=await this.userModel.create({ name,email,password });
    return createdUser
  }
  async findUserByEmail(email:string):Promise<User>{
    const user=await this.userModel.findOne({where:{email}})
    return user
  }
  async hashedPassword(password:string):Promise<string>{
        const hashedPassword=await bcrypt.hash(password,10);
        return hashedPassword
  }
  async validatePassword(password:string,hashedPassword:string):Promise<boolean>{
      const comparePassword=bcrypt.compare(password,hashedPassword)
      return comparePassword
  }
  async createToken(email:string):Promise<string>{
    const token=await jwt.sign({email},process.env.TOKEN_SECRET,{expiresIn:'7d'})
    return token
  }
}
