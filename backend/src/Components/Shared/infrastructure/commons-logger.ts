import winston from 'winston';

const { combine, timestamp, json, errors } = winston.format;

export const commonsLogger = (transports: winston.transport[] = []) => ({
  format: combine(
    errors({ stack: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss.SSS A'
    }),
    json()
  ),
  transports: [new winston.transports.Console(), ...transports]
});
