import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { AppController,CatController } from './controllers/app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot(), // Load .env variables
    SequelizeModule.forRoot({
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Shreyansh_31',
      database: 'todo',
      models: [User], // Add all models here
      autoLoadModels: true, // Automatically load models
      synchronize: true, // Auto-sync models to DB (disable in production)
    }),
    UsersModule, // Register modules
  ],
  controllers: [AppController,CatController],
  providers: [AppService],
})
export class AppModule {}
