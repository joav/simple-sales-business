import { DomainStatus } from '@Shared/domain';
import { stdResponse } from './std-response';

export const successResponse = (data: unknown, httpStatusCode: number) =>
  stdResponse(DomainStatus.success(), httpStatusCode, data);
