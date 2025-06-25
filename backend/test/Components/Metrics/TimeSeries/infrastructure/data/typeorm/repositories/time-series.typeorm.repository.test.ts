import { TimeSerie } from "@Metrics/TimeSeries/domain";
import { Category } from "@Metrics/Shared/domain";
import { Container } from "inversify";
import { configFactory } from "../../../../../../../utils/typeorm/config";
import { TimeSeriesTypeormRepository, TimeSerieEntity } from "@Metrics/TimeSeries/infrastructure";
import { DataSourceWrapper, TypeormRepository } from "@Shared/infrastructure";

describe("TimeSerieTypeormRepository", () => {
  let container: Container;
  let timeSerieTypeormRepository: TimeSeriesTypeormRepository;
  beforeAll(() => {
    container = new Container();
    const dataSourceWrapper = new DataSourceWrapper(configFactory(TimeSerieEntity));
    container.bind(DataSourceWrapper).toConstantValue(dataSourceWrapper);
    container.bind(TypeormRepository).toSelf();
    container.bind(TimeSeriesTypeormRepository).toSelf();
    timeSerieTypeormRepository = container.get(TimeSeriesTypeormRepository);
  });

  it('should listTimeSeries', async () => {
    const timeSeries = await timeSerieTypeormRepository.listTimeSeries(Category.SALES);

    expect(timeSeries).toBeDefined();
    expect(timeSeries[0].constructor).toBe(TimeSerie);
    expect(timeSeries[0].category).toEqual(Category.SALES);
  });

  afterAll(async () => {
    (await container.get(DataSourceWrapper).dataSource).destroy();
  });
})
