import { Aggregate, AggregateValue } from "@Metrics/Aggregates/domain";
import { Category } from "@Metrics/Shared/domain";
import { AggregateEntity } from "@Components/Metrics/infrastructure/data/typeorm/entities/aggregate.entity";
import { AggregatesTypeormRepository } from "@Components/Metrics/infrastructure/data/typeorm/repositories/aggregates.typeorm.repository";
import { DataSourceWrapper } from "@Components/Shared/infrastructure/data/typeorm/data-source-wrapper";
import { TypeormRepository } from "@Components/Shared/infrastructure/data/typeorm/typeorm.repository";
import { Container } from "inversify";
import { configFactory } from "../../../../../../utils/typeorm/config";

describe("AggregateTypeormRepository", () => {
  let container: Container;
  let aggregateTypeormRepository: AggregatesTypeormRepository;
  beforeAll(() => {
    container = new Container();
    const dataSourceWrapper = new DataSourceWrapper(configFactory(AggregateEntity));
    container.bind(DataSourceWrapper).toConstantValue(dataSourceWrapper);
    container.bind(TypeormRepository).toSelf();
    container.bind(AggregatesTypeormRepository).toSelf();
    aggregateTypeormRepository = container.get(AggregatesTypeormRepository);
  });

  it('should listAggregates', async () => {
    const aggregates = await aggregateTypeormRepository.listAggregates(Category.PRODUCTS);

    expect(aggregates).toBeDefined();
    expect(aggregates[0].constructor).toBe(Aggregate);
    expect(aggregates[0].category).toEqual(Category.PRODUCTS);
  });

  it('should get', async () => {
    const aggregate = await aggregateTypeormRepository.get(Category.PRODUCTS, 'with-stock');

    expect(aggregate).toBeDefined();
    expect(aggregate.constructor).toBe(AggregateValue);
  });

  afterAll(async () => {
    (await container.get(DataSourceWrapper).dataSource).destroy();
  });
})
