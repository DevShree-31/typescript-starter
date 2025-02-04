
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken'
import { ValidationError } from 'sequelize';
interface customRequest extends Request{
  decoded?:any
}
@Injectable()
export class taskMiddleWare implements NestMiddleware {
  use(req: customRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['authorization'];
  
  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header missing' });
  }

  const token = authHeader.split(' ')[1]; 

  if (!token) {
    return res.status(401).json({ message: 'Token missing' });
  }
console.log(token)
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    req.decoded= decoded;
  } catch (error) {
    if (error instanceof ValidationError) {
        console.error('Validation Errors:');
        error.errors.forEach((err) => {
          console.error(`${err.path}: ${err.message}`);
        });
      } else {
        console.error('Error: while', error);
      }
    return res.status(403).json({ message: 'Invalid or expired token', error: error.message });
  }
    next();
  }
}
