import { DomainStatus } from '@Components/Shared/domain/domain-status';
import { stdResponse } from './std-response';

export const successResponse = (data: unknown, httpStatusCode: number) =>
  stdResponse(DomainStatus.success(), httpStatusCode, data);
