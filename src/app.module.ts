import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { TasksService } from './tasks/tasks.service'; // Import the service

@Module({
  imports: [
    ScheduleModule.forRoot(),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService], // Register the service
})
export class AppModule {}
