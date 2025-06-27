import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';
import { DataValue } from './data-value';
import { DataValuePrimitives } from './data-value.primitives';

export const TIME_SERIE_EXCEPTIONS = {
  InvalidTimeSerieSlug: {
    statusCode: 3000,
    statusMessage: 'Metrics:Domain:TimeSerie:InvalidTimeSerieSlug'
  }
};

export class TimeSerie {
  private constructor(
    public readonly timeSerieSlug: string,
    public readonly category: Category,
    public readonly data?: DataValue[]
  ) {}

  toPrimitives() {
    return {
      timeSerieSlug: this.timeSerieSlug,
      category: this.category as string,
      data: this.data?.map((dv) => dv.toPrimitives())
    };
  }

  static fromPrimitives(values: {
    timeSerieSlug: string;
    category: string;
    data?: DataValuePrimitives[];
  }) {
    const aggregateId = TimeSerie.verifyTimeSerieSlug(values.timeSerieSlug);
    const category = categoryFromPrimitive(values.category);
    const data = TimeSerie.dataFactory(values.data);
    return new TimeSerie(aggregateId, category, data);
  }

  protected static verifyTimeSerieSlug(timeSerieSlug: string): string {
    if (!timeSerieSlug)
      throw InvalidInputException.fromStatusParams(TIME_SERIE_EXCEPTIONS.InvalidTimeSerieSlug);
    return timeSerieSlug;
  }

  private static dataFactory(data?: DataValuePrimitives[]) {
    if (!data) return undefined;
    return data.map((dvp) => DataValue.fromPrimitives(dvp));
  }
}
