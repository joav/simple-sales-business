import { RankingCompetitorPrimitives } from './ranking-competitor.primitives';
import { Ranking } from './ranking';

export class RankingBuilder {
  private rankingSlug = '';
  private rankingValueTitle = '';
  private category = '';
  private data?: RankingCompetitorPrimitives[];

  withRankingSlug(rankingSlug: string) {
    this.rankingSlug = rankingSlug;
    return this;
  }

  withRankingValueTitle(rankingValueTitle: string) {
    this.rankingValueTitle = rankingValueTitle;
    return this;
  }

  withCategory(category: string) {
    this.category = category;
    return this;
  }

  withData(data?: RankingCompetitorPrimitives[]) {
    this.data = data;
    return this;
  }

  build() {
    return Ranking.fromPrimitives({
      rankingSlug: this.rankingSlug,
      rankingValueTitle: this.rankingValueTitle,
      category: this.category,
      data: this.data
    });
  }
}
