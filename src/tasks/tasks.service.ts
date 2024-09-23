import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class TasksService {
  @Cron(CronExpression.EVERY_MINUTE) // Run every minute
  handleCron() {
    console.log('Cron job executed every minute');
  }
}
