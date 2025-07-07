import { TypeormRepository } from '@Shared/infrastructure';
import { RankingEntity } from '../entities';
import { Ranking, RankingsRepository } from '@Metrics/Rankings/domain';
import { injectable, injectFromBase } from 'inversify';
import { Category } from '@Metrics/Shared/domain';

@injectable()
@injectFromBase({
  extendConstructorArguments: true,
  extendProperties: false
})
export class RankingsTypeormRepository
  extends TypeormRepository<RankingEntity>
  implements RankingsRepository
{
  protected entity = RankingEntity;

  async listRankings(category: Category): Promise<Ranking[]> {
    const repository = await this.repository;
    const entities = await repository.findBy({ category });

    return entities.map((e) => e.toDomain());
  }

  async get(category: Category, rankingSlug: string): Promise<Ranking> {
    const repository = await this.repository;
    const ranking = await repository.findOneOrFail({
      where: {
        category,
        rankingSlug
      }
    });

    return ranking.toDomain();
  }
}
