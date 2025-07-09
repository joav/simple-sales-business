import winston from 'winston';
import { commonsLogger } from '@Shared/infrastructure';
import { appLoggers } from './loggers';

winston.loggers.add(appLoggers.HTTP, {
  level: 'http',
  defaultMeta: {
    component: 'App',
    logger: appLoggers.HTTP
  },
  ...commonsLogger()
});
winston.loggers.add(appLoggers.DEFAULT, {
  level: process.env.LOG_LEVEL || 'info',
  defaultMeta: {
    component: 'App',
    logger: appLoggers.DEFAULT
  },
  ...commonsLogger()
});
