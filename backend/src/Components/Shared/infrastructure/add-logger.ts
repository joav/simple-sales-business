import winston from 'winston';
import { commonsLogger } from './commons-logger';

export const addLogger = (
  component: string,
  logger: string,
  level = process.env.LOG_LEVEL || 'info',
  transports: winston.transport[] = []
) => {
  winston.loggers.add(logger, {
    level,
    defaultMeta: {
      component,
      logger
    },
    ...commonsLogger(transports)
  });
};
