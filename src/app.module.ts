import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.model';
import { UsersModule } from './users/users.module';
import { AppController,CatController } from './controllers/app.controller';
import { AppService } from './app.service';
import { TaskModule } from './tasks/tasks.module';
import { taskMiddleWare } from './tasks/task.middleware';

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
    UsersModule,
    TaskModule
  ],
  controllers: [AppController,CatController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(taskMiddleWare)
      .forRoutes('/task');
  }
}
