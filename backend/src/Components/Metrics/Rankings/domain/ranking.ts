import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { InvalidInputException } from '@Shared/domain';

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
    public readonly category: Category
  ) {}

  toPrimitives() {
    return {
      rankingSlug: this.rankingSlug,
      rankingValueTitle: this.rankingValueTitle,
      category: this.category as string
    };
  }

  static fromPrimitives(values: {
    rankingSlug: string;
    rankingValueTitle: string;
    category: string;
  }) {
    const rankingSlug = Ranking.verifRankingSlug(values.rankingSlug);
    const rankingValueTitle = Ranking.verifRankingValueTitle(values.rankingValueTitle);
    const category = categoryFromPrimitive(values.category);
    return new Ranking(rankingSlug, rankingValueTitle, category);
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
}
