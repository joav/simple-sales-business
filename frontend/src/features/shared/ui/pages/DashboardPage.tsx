import React, { useCallback } from 'react';
import { useMetrics } from '../../../metrics/hooks/useMetrics';
import { getRanking } from '../../../metrics/services/metrics.service';
import RankingList from '../../../metrics/ui/organisms/RankingList';
import AggregatesSection from '../../../metrics/ui/organisms/AggregatesSection';
import TimeSeriesSection from '../../../metrics/ui/organisms/TimeSeriesSection';

const DashboardPage: React.FC = () => {
  const { data: bestSellingAllTime, loading: loadingBestSellingAllTime } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-all-time'), []));
  const { data: bestSellingCurrentMonth, loading: loadingBestSellingCurrentMonth } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-current-month'), []));

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      <AggregatesSection />

      {/* Sección de Rankings y Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesSection />
        <RankingList
          title="Productos más vendidos (histórico)"
          items={bestSellingAllTime?.data ?? []}
          isLoading={loadingBestSellingAllTime}
        />
        <RankingList
          title="Productos más vendidos (mes actual)"
          items={bestSellingCurrentMonth?.data ?? []}
          isLoading={loadingBestSellingCurrentMonth}
        />
      </div>
    </div>
  );
};

export default DashboardPage;

