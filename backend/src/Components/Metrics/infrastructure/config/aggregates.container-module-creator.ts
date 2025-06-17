import { ContainerModule } from 'inversify';
import { ContainerModuleCreator } from '@Components/Shared/infrastructure/container-module-creator';
import { AggregatesGetter } from '@Components/Metrics/application/get-aggregates/aggregates-getter';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';

export default {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = Symbol.for('AggregatesRepository');
      options.bind(repoSymbol).toConstantValue({
        listAggregates: () => Promise.resolve([])
      });
      options
        .bind(AggregatesGetter)
        .toResolvedValue((repo: AggregatesRepository) => new AggregatesGetter(repo), [repoSymbol]);
      options
        .bind(GetAggregatesQueryHandler)
        .toResolvedValue(
          (getter: AggregatesGetter) => new GetAggregatesQueryHandler(getter),
          [AggregatesGetter]
        );
      options
        .bind(sharedIdentifiers.QUERY_HANDLER)
        .toResolvedValue(
          (handler: GetAggregatesQueryHandler) => handler,
          [GetAggregatesQueryHandler]
        );
    });
  }
} satisfies ContainerModuleCreator;
