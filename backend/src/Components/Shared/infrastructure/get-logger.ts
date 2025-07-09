import winston from 'winston';

export const getLogger = (logger: string) => winston.loggers.get(logger);
