import { appErrorHandler } from "@App/app.error-handler";
import { InvalidInputException } from "@Shared/domain";
import { BadRequest, NotFound } from "express-openapi-validator/dist/openapi.validator";
import { StatusCodes } from "http-status-codes";
import { EntityNotFoundError } from "typeorm";
import '@App/logger';

describe('AppErrorHandler', () => {
  it('should return error response with message Bad Request', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const err = new BadRequest({ path: '' });

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        statusCode: 1,
        statusMessage: "Bad Request",
        httpStatusCode: StatusCodes.BAD_REQUEST
      }
    });
  });
  it('should return error response with message Not Found', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const err = new NotFound({ path: '' });

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        statusCode: 2,
        statusMessage: "Not Found Resource",
        httpStatusCode: StatusCodes.NOT_FOUND
      }
    });
  });
  it('should return error response with message Not Found Data', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const err = new EntityNotFoundError('SomeEntity', 'SomeCriteria');

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.NOT_FOUND);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        statusCode: 3,
        statusMessage: "Not Found Data",
        httpStatusCode: StatusCodes.NOT_FOUND
      }
    });
  });
  it('should return error response with message from InvalidInputException', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const domainStatus = {
      statusCode: 5655,
      statusMessage: 'MSG'
    };
    const err = InvalidInputException.fromStatusParams(domainStatus);

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.BAD_REQUEST);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        ...domainStatus,
        httpStatusCode: StatusCodes.BAD_REQUEST
      }
    });
  });
  it('should return error response with message Unknown error -1', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const err = new Error();

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        statusCode: -1,
        statusMessage: "Unknown error",
        httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR
      }
    });
  });
  it('should return error response with message Unknown error -2', () => {
    const req: any = {};
    const res: any = {
      status: vi.fn(function () { return res }),
      json: vi.fn(function () { return res })
    };
    const err = {};

    appErrorHandler(err, req, res, undefined);

    expect(res.status).toHaveBeenCalledWith(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.json).toHaveBeenCalledWith({
      status: {
        statusCode: -2,
        statusMessage: "Unknown error",
        httpStatusCode: StatusCodes.INTERNAL_SERVER_ERROR
      }
    });
  });
});
