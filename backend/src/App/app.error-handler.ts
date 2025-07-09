/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidInputException } from '@Shared/domain';
import { StdResponse, StdResponseBuilder } from '@Shared/infrastructure';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, NotFound } from 'express-openapi-validator/dist/openapi.validator';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFoundError } from 'typeorm';
import winston from 'winston';
import { InfrastructureLogger } from '@Shared/domain';
import { appLoggers } from './loggers';

let _logger: InfrastructureLogger;

const logger = () => {
  if (!_logger) _logger = winston.loggers.get(appLoggers.DEFAULT);
  _logger.exitOnError = false;
  return _logger;
};

export const appErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  let response: StdResponse;
  const builder = new StdResponseBuilder();
  if (err instanceof BadRequest) {
    response = builder
      .withStatusCode(1)
      .withStatusMessage('Bad Request')
      .withHttpStatusCode(StatusCodes.BAD_REQUEST)
      .build();
    logger().warn('Bad Request', err.errors);
  }

  if (err instanceof NotFound) {
    response = builder
      .withStatusCode(2)
      .withStatusMessage('Not Found Resource')
      .withHttpStatusCode(StatusCodes.NOT_FOUND)
      .build();
    logger().warn('Not Found Resource', err.errors);
  }

  if (err instanceof EntityNotFoundError) {
    response = builder
      .withStatusCode(3)
      .withStatusMessage('Not Found Data')
      .withHttpStatusCode(StatusCodes.NOT_FOUND)
      .build();
    logger().warn('Not Found Data', { message: err.message });
  }

  if (err instanceof InvalidInputException) {
    response = builder
      .withDomainStatus(err.status)
      .withHttpStatusCode(StatusCodes.BAD_REQUEST)
      .build();
    logger().warn('Invalid Input', {
      status: err.status.toPrimitives(),
      exceptionType: err.exceptionType
    });
  }

  if (!response && err instanceof Error) {
    response = builder
      .withStatusCode(-1)
      .withStatusMessage('Unknown error')
      .withHttpStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
      .build();
    logger().error(err);
  }
  if (!response) {
    response = builder
      .withStatusCode(-2)
      .withStatusMessage('Unknown error')
      .withHttpStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
      .build();
    logger().error('Not a Error instance', JSON.parse(JSON.stringify(err)));
  }

  res.status(response.status.httpStatusCode).json(response);
};
