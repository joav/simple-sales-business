import { TypeormRepository } from '@Shared/infrastructure';
import { injectable, injectFromBase } from 'inversify';
import { AggregateEntity } from '../entities/aggregate.entity';
import {
  AggregatesRepository,
  AggregateValuesRepository,
  Aggregate,
  AggregateValue
} from '@Metrics/Aggregates/domain';
import { Category } from '@Metrics/Shared/domain';

@injectable()
@injectFromBase({
  extendConstructorArguments: true,
  extendProperties: false
})
export class AggregatesTypeormRepository
  extends TypeormRepository<AggregateEntity>
  implements AggregatesRepository, AggregateValuesRepository
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

  async get(category: Category, aggregateId: string): Promise<AggregateValue> {
    const repository = await this.repository;
    const aggregate = await repository.findOneByOrFail({
      category,
      aggregateId
    });

    return aggregate.toAggregateValue();
  }
}
