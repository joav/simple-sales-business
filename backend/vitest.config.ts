import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'text-summary', 'html', 'lcov'],
      exclude: [
        'dist/**',
        'src/Components/Shared/infrastructure/data/typeorm/data-source.config.ts',
        '**/*js',
        'bin/**',
        'src/data/**',
        '**/*.d.ts',
        '**/**/domain/**/*.repository.ts',
        '**/*.primitives.ts',
        '**/*.logger.ts',
        'ormconfig.ts',
        'vitest.config.ts',
        'src/main.ts',
        'src/components.config-executor.ts',
        'src/App/Morgan/morgan-config.ts',
        'src/Components/Metrics/Rankings/application/ranking.response.ts',
        'src/Components/Metrics/TimeSeries/application/time-serie.response.ts',
        'src/Components/Shared/domain/query-bus.ts',
        'src/Components/Shared/domain/query-handler.ts',
        'src/Components/Shared/domain/query.ts',
        'src/Components/Shared/domain/response.ts',
        'src/Components/Shared/infrastructure/config-executor.ts',
        'src/Components/Shared/infrastructure/container-module-creator.ts',
        'src/Components/Shared/infrastructure/web/ComponentRoutes.ts',
        'src/Components/Shared/infrastructure/web/Controller.ts',
        'src/Components/Shared/infrastructure/web/Routes.ts'
      ],
      thresholds: {
        branches: 90,
        functions: 90,
        lines: 90,
      },
    },
  },
});
