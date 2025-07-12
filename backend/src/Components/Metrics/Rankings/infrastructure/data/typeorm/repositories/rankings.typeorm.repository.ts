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

  async get(category: Category, rankingSlug: string, top: number): Promise<Ranking> {
    const repository = await this.repository;
    const ranking = await repository
      .createQueryBuilder('ranking')
      .leftJoinAndSelect('ranking.data', 'data')
      .where('ranking.category = :category')
      .andWhere('ranking.rankingSlug = :rankingSlug')
      .orderBy('data.value', 'DESC')
      .limit(top)
      .setParameters({ category, rankingSlug })
      .getOneOrFail();

    return ranking.toDomainWithData();
  }
}
