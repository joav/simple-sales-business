import { DomainStatus } from '@Shared/domain';

export type StdResponse = {
  status: {
    statusCode: number;
    statusMessage: string;
    httpStatusCode: number;
  };
  data: unknown;
};

export const stdResponse = (
  status: DomainStatus,
  httpStatusCode: number,
  data: unknown
): StdResponse => ({
  status: {
    ...status.toPrimitives(),
    httpStatusCode
  },
  data
});
