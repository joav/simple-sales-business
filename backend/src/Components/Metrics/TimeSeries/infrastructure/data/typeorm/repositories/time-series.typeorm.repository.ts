import { TypeormRepository } from '@Shared/infrastructure';
import { TimeSerieEntity } from '../entities';
import { TimeSerie, TimeSeriesRepository } from '@Metrics/TimeSeries/domain';
import { injectable, injectFromBase } from 'inversify';
import { Category } from '@Metrics/Shared/domain';

@injectable()
@injectFromBase({
  extendConstructorArguments: true,
  extendProperties: false
})
export class TimeSeriesTypeormRepository
  extends TypeormRepository<TimeSerieEntity>
  implements TimeSeriesRepository
{
  protected entity = TimeSerieEntity;

  async listTimeSeries(category: Category): Promise<TimeSerie[]> {
    const repository = await this.repository;
    const entities = await repository.findBy({ category });

    return entities.map((e) => e.toDomain());
  }

  async get(category: Category, timeSerieSlug: string, from: Date, to: Date): Promise<TimeSerie> {
    const repository = await this.repository;
    const timeSerie = await repository
      .createQueryBuilder('timeSerie')
      .leftJoinAndSelect(
        'timeSerie.data',
        'data',
        'data.timeSerieId = timeSerie.id AND data.date > :from AND data.date <= :to'
      )
      .where('timeSerie.category = :category')
      .andWhere('timeSerie.timeSerieSlug = :timeSerieSlug')
      .orderBy('data.date', 'ASC')
      .setParameters({ from: from.toISOString(), to: to.toISOString(), category, timeSerieSlug })
      .getOneOrFail();

    return timeSerie.toDomainWithData();
  }
}
