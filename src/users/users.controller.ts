import { Controller, Get, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.model';
import { log } from 'console';

@Controller('auth')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Post('signup')
  async signUp(@Body() createUserDto: { name: string; email: string,password:string }): Promise<User> {
    if(!createUserDto.name||!createUserDto.email||!createUserDto.password){
        throw new HttpException({message:"These field are required"},HttpStatus.BAD_REQUEST)
    }
    try {
        const user=await this.usersService.findUserByEmail(createUserDto.email)
    if(user){
        throw new HttpException({message:"User already exist"},HttpStatus.BAD_REQUEST)
    }
    const hashedPassword=await this.usersService.hashedPassword(createUserDto.password)
    return this.usersService.createUser(createUserDto.name, createUserDto.email,hashedPassword);
    } catch (error) {
        console.log(error)
        throw new HttpException({message:error},HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
  @Post('signin')
    async signIn(@Body() loginUserDto: {email:string,password:string}):Promise<{token:string,message:string,status:Number}>{
        if(!loginUserDto.email||!loginUserDto.password){
            throw new HttpException({message:"These field are required"},HttpStatus.BAD_REQUEST)
        }
        const user=await this.usersService.findUserByEmail(loginUserDto.email)
        if(!user){
            throw new HttpException({message:"User does not exist"},HttpStatus.NOT_FOUND)
        }
        const validatePassword=this.usersService.validatePassword(user.password,loginUserDto.password)
        if(!validatePassword){
            throw new HttpException({message:"Invalid credentials"},HttpStatus.BAD_REQUEST)
        }
        const token=await this.usersService.createToken(loginUserDto.email)
         return {token,message:"user created successfully",status:HttpStatus.OK}
    }
}
