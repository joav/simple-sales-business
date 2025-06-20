import { TypeormRepository } from '@Components/Shared/infrastructure/data/typeorm/typeorm.repository';
import { injectable, injectFromBase } from 'inversify';
import { AggregateEntity } from '../entities/aggregate.entity';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import { Aggregate } from '@Components/Metrics/domain/aggregate';
import { Category } from '@Components/Metrics/domain/category';

@injectable()
@injectFromBase({
  extendConstructorArguments: true,
  extendProperties: false
})
export class AggregatesTypeormRepository
  extends TypeormRepository<AggregateEntity>
  implements AggregatesRepository
{
  protected entity = AggregateEntity;

  async listAggregates(category: Category): Promise<Aggregate[]> {
    const repository = await this.repository;
    const entities = await repository.find({
      select: {
        aggregateFn: true,
        aggregateId: true,
        category: true
      },
      where: {
        category
      }
    });

    return entities.map((e) => e.toDomain());
  }
}
