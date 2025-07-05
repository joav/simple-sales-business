import { Ranking } from "@Metrics/Rankings/domain";
import { Category } from "@Metrics/Shared/domain";
import { Container } from "inversify";
import { configFactory } from "../../../../../../../utils/typeorm/config";
import { RankingsTypeormRepository, RankingEntity } from "@Metrics/Rankings/infrastructure";
import { DataSourceWrapper, TypeormRepository } from "@Shared/infrastructure";

describe("RankingTypeormRepository", () => {
  let container: Container;
  let rankingTypeormRepository: RankingsTypeormRepository;
  beforeAll(() => {
    container = new Container();
    const dataSourceWrapper = new DataSourceWrapper(configFactory(RankingEntity));
    container.bind(DataSourceWrapper).toConstantValue(dataSourceWrapper);
    container.bind(TypeormRepository).toSelf();
    container.bind(RankingsTypeormRepository).toSelf();
    rankingTypeormRepository = container.get(RankingsTypeormRepository);
  });

  it('should listRankings', async () => {
    const rankings = await rankingTypeormRepository.listRankings(Category.SALES);

    expect(rankings).toBeDefined();
    expect(rankings[0].constructor).toBe(Ranking);
    expect(rankings[0].category).toEqual(Category.SALES);
  });

  afterAll(async () => {
    (await container.get(DataSourceWrapper).dataSource).destroy();
  });
})
