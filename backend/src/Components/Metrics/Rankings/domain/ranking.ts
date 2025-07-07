import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';
import { RankingCompetitor } from './ranking-competitor';
import { RankingCompetitorPrimitives } from './ranking-competitor.primitives';

export const RANKING_EXCEPTIONS = {
  InvalidRankingSlug: {
    statusCode: 4000,
    statusMessage: 'Metrics:Domain:Ranking:InvalidRankingSlug'
  },
  InvalidRankingValueTitle: {
    statusCode: 4001,
    statusMessage: 'Metrics:Domain:Ranking:InvalidRankingValueTitle'
  }
};

export class Ranking {
  private constructor(
    public readonly rankingSlug: string,
    public readonly rankingValueTitle: string,
    public readonly category: Category,
    public readonly data?: RankingCompetitor[]
  ) {}

  toPrimitives() {
    return {
      rankingSlug: this.rankingSlug,
      rankingValueTitle: this.rankingValueTitle,
      category: this.category as string,
      data: this.data?.map((rc) => rc.toPrimitives())
    };
  }

  static fromPrimitives(values: {
    rankingSlug: string;
    rankingValueTitle: string;
    category: string;
    data?: RankingCompetitorPrimitives[];
  }) {
    const rankingSlug = Ranking.verifyRankingSlug(values.rankingSlug);
    const rankingValueTitle = Ranking.verifyRankingValueTitle(values.rankingValueTitle);
    const category = categoryFromPrimitive(values.category);
    const data = Ranking.dataFactory(values.data);
    return new Ranking(rankingSlug, rankingValueTitle, category, data);
  }

  protected static verifyRankingSlug(rankingSlug: string): string {
    if (!rankingSlug)
      throw InvalidInputException.fromStatusParams(RANKING_EXCEPTIONS.InvalidRankingSlug);
    return rankingSlug;
  }

  protected static verifyRankingValueTitle(rankingValueTitle: string): string {
    if (!rankingValueTitle)
      throw InvalidInputException.fromStatusParams(RANKING_EXCEPTIONS.InvalidRankingValueTitle);
    return rankingValueTitle;
  }

  private static dataFactory(data?: RankingCompetitorPrimitives[]) {
    if (!data) return undefined;
    return data.map((rcp) => RankingCompetitor.fromPrimitives(rcp));
  }
}
