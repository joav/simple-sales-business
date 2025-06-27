import { strToDateOrError } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';
import { DataValuePrimitives } from './data-value.primitives';

export const DATA_VALUE_EXCEPTIONS = {
  InvalidValue: {
    statusCode: 3001,
    statusMessage: 'Metrics:Domain:DataValue:InvalidValue'
  },
  InvalidDate: {
    statusCode: 3002,
    statusMessage: 'Metrics:Domain:DataValue:InvalidDate'
  }
};

export class DataValue {
  private constructor(
    public readonly date: Date,
    public readonly value: number
  ) {}

  toPrimitives() {
    return {
      value: this.value,
      date: this.date.toISOString()
    } satisfies DataValuePrimitives;
  }

  static fromPrimitives(values: DataValuePrimitives) {
    const date = strToDateOrError(values.date, DataValue.dateErrorFactory);
    const value = DataValue.verifyValue(values.value);
    return new DataValue(date, value);
  }

  private static verifyValue(value: number) {
    if (isNaN(value))
      throw InvalidInputException.fromStatusParams(DATA_VALUE_EXCEPTIONS.InvalidValue);
    return +value;
  }

  private static dateErrorFactory() {
    return InvalidInputException.fromStatusParams(DATA_VALUE_EXCEPTIONS.InvalidDate);
  }
}
