/* eslint-disable @typescript-eslint/no-unused-vars */
import { InvalidInputException } from '@Components/Shared/domain/exceptions/invalid-input.exception';
import { StdResponse } from '@Components/Shared/infrastructure/web/responses/std-response';
import { StdResponseBuilder } from '@Components/Shared/infrastructure/web/responses/std-response.builder';
import { NextFunction, Request, Response } from 'express';
import { BadRequest, NotFound } from 'express-openapi-validator/dist/openapi.validator';
import { StatusCodes } from 'http-status-codes';
import { EntityNotFoundError } from 'typeorm';

export const appErrorHandler = (
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // TODO: Log error
  let response: StdResponse;
  const builder = new StdResponseBuilder();
  if (err instanceof BadRequest) {
    response = builder
      .withStatusCode(1)
      .withStatusMessage('Bad Request')
      .withHttpStatusCode(StatusCodes.BAD_REQUEST)
      .build();
  }

  if (err instanceof NotFound) {
    response = builder
      .withStatusCode(2)
      .withStatusMessage('Not Found Resource')
      .withHttpStatusCode(StatusCodes.NOT_FOUND)
      .build();
  }

  if (err instanceof EntityNotFoundError) {
    response = builder
      .withStatusCode(3)
      .withStatusMessage('Not Found Data')
      .withHttpStatusCode(StatusCodes.NOT_FOUND)
      .build();
  }

  if (err instanceof InvalidInputException) {
    response = builder
      .withDomainStatus(err.status)
      .withHttpStatusCode(StatusCodes.BAD_REQUEST)
      .build();
  }

  if (!response && err instanceof Error) {
    response = builder
      .withStatusCode(-1)
      .withStatusMessage('Unknown error')
      .withHttpStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
      .build();
  }
  if (!response) {
    response = builder
      .withStatusCode(-2)
      .withStatusMessage('Unknown error')
      .withHttpStatusCode(StatusCodes.INTERNAL_SERVER_ERROR)
      .build();
  }

  res.status(response.status.httpStatusCode).json(response);
};
