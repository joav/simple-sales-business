import { DomainException } from '@Shared/domain';

export const strToDateOrError = (dateStr: string, errorFactory: () => DomainException) => {
  const dateObject = new Date(dateStr);

  if (isNaN(dateObject.getTime()) || dateObject.toISOString() !== dateStr) {
    throw errorFactory();
  }

  return dateObject;
};
