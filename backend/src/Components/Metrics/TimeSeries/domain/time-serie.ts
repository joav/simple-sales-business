import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';

export const TIME_SERIE_EXCEPTIONS = {
  InvalidTimeSerieSlug: {
    statusCode: 3000,
    statusMessage: 'Metrics:Domain:TimeSerie:InvalidTimeSerieSlug'
  }
};

export class TimeSerie {
  private constructor(
    public readonly timeSerieSlug: string,
    public readonly category: Category
  ) {}

  toPrimitives() {
    return {
      timeSerieSlug: this.timeSerieSlug,
      category: this.category as string
    };
  }

  static fromPrimitives(values: { timeSerieSlug: string; category: string }) {
    const aggregateId = TimeSerie.verifyTimeSerieSlug(values.timeSerieSlug);
    const category = categoryFromPrimitive(values.category);
    return new TimeSerie(aggregateId, category);
  }

  protected static verifyTimeSerieSlug(timeSerieSlug: string): string {
    if (!timeSerieSlug)
      throw InvalidInputException.fromStatusParams(TIME_SERIE_EXCEPTIONS.InvalidTimeSerieSlug);
    return timeSerieSlug;
  }
}
