import { strToDateOrError } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';
import { RankingCompetitorPrimitives } from './ranking-competitor.primitives';

export const RANKING_COMPETITOR_EXCEPTIONS = {
  InvalidName: {
    statusCode: 4002,
    statusMessage: 'Metrics:Domain:RankingCompetitor:InvalidName'
  },
  InvalidValue: {
    statusCode: 4003,
    statusMessage: 'Metrics:Domain:RankingCompetitor:InvalidValue'
  },
  InvalidLastUpdate: {
    statusCode: 4004,
    statusMessage: 'Metrics:Domain:RankingCompetitor:InvalidLastUpdate'
  }
};

export class RankingCompetitor {
  private constructor(
    public readonly name: string,
    public readonly lastUpdate: Date,
    public readonly value: number
  ) {}

  toPrimitives() {
    return {
      name: this.name,
      value: this.value,
      lastUpdate: this.lastUpdate.toISOString()
    } satisfies RankingCompetitorPrimitives;
  }

  static fromPrimitives(values: RankingCompetitorPrimitives) {
    const name = RankingCompetitor.verifyName(values.name);
    const lastUpdate = strToDateOrError(
      values.lastUpdate,
      RankingCompetitor.lastUpdateErrorFactory
    );
    const value = RankingCompetitor.verifyValue(values.value);
    return new RankingCompetitor(name, lastUpdate, value);
  }

  protected static verifyName(name: string): string {
    if (!name)
      throw InvalidInputException.fromStatusParams(RANKING_COMPETITOR_EXCEPTIONS.InvalidName);
    return name;
  }

  private static verifyValue(value: number) {
    if (isNaN(value))
      throw InvalidInputException.fromStatusParams(RANKING_COMPETITOR_EXCEPTIONS.InvalidValue);
    return +value;
  }

  private static lastUpdateErrorFactory() {
    return InvalidInputException.fromStatusParams(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate);
  }
}
