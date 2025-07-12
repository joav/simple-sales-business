import { DomainException } from '@Shared/domain';
import { strToDateOrError } from './str-to-date-or-error';

export const strOrEmptyStrToDateOrError = (
  dateStr: string,
  errorFactory: () => DomainException
) => {
  const dateToValidate = dateStr === '' ? new Date().toISOString() : dateStr;
  return strToDateOrError(dateToValidate, errorFactory);
};
