import { DomainStatus } from '../domain-status';

export class DomainException extends Error {
  constructor(
    public readonly status: DomainStatus,
    public readonly exceptionType: string
  ) {
    super(`Domain Exception(${exceptionType}): ${status.statusMessage}`);
  }
}
