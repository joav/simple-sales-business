import { DomainStatus } from '../domain-status';
import { DomainException } from './domain-exception';

export class InvalidInputException extends DomainException {
  constructor(status: DomainStatus) {
    super(status, 'InvalidInputException');
  }

  static fromStatusParams(params: {
    statusCode: number;
    statusMessage: string;
  }): InvalidInputException {
    const status = DomainStatus.create(params.statusCode, params.statusMessage);
    return new InvalidInputException(status);
  }
}
