import { StatusCodes } from 'http-status-codes';
import { stdResponse } from './std-response';
import { DomainStatus } from '@Components/Shared/domain/domain-status';

export class StdResponseBuilder {
  private data: unknown = undefined;
  private statusCode = 0;
  private statusMessage = '';
  private httpStatusCode = StatusCodes.OK;

  withStatusCode(statusCode: number) {
    this.statusCode = statusCode;
    return this;
  }

  withStatusMessage(statusMessage: string) {
    this.statusMessage = statusMessage;
    return this;
  }

  withHttpStatusCode(httpStatusCode: number) {
    this.httpStatusCode = httpStatusCode;
    return this;
  }

  withDomainStatus(status: DomainStatus) {
    this.statusCode = status.statusCode;
    this.statusMessage = status.statusMessage;
    return this;
  }

  build() {
    return stdResponse(
      DomainStatus.create(this.statusCode, this.statusMessage),
      this.httpStatusCode,
      this.data
    );
  }
}
