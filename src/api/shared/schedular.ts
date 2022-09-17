import { ScheduleOptions, validate, schedule, ScheduledTask } from 'node-cron'

import { Logger } from '../config/logger.config';

export class Scheduler {
  private scheduleTime: string;

  private task: ScheduledTask;

  private options: ScheduleOptions = {
    scheduled: true,
  };

  constructor(timeToExcute: string) {
    this.scheduleTime = timeToExcute;
  }

  init(taskFunction: () => void) {
    const isJobValidated = validate(this.scheduleTime);

    if (!isJobValidated) {
      Logger.log('error', 'schedule time has a bad form');
      process.exit(0);
    }

    this.task = schedule(this.scheduleTime, taskFunction, this.options);

    this.task.start();
  }
}
