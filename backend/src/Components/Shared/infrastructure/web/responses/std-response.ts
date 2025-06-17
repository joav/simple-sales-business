import { DomainStatus } from '@Components/Shared/domain/domain-status';

export const stdResponse = (status: DomainStatus, httpStatusCode: number, data: unknown) => ({
  status: {
    ...status.toPrimitives(),
    httpStatusCode
  },
  data
});
