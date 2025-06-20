import { InvalidInputException } from '@Components/Shared/domain/exceptions/invalid-input.exception';
import { isCategory } from './is-category';

export const INVALID_CATEGORY = {
  statusCode: 2000,
  statusMessage: 'Metrics:Domain:Aggregate:InvalidCategory'
};

export const categoryFromPrimitive = (category: string) => {
  if (!isCategory(category)) throw InvalidInputException.fromStatusParams(INVALID_CATEGORY);
  return category;
};
