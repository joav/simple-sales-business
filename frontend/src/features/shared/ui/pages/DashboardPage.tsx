import React, { useCallback } from 'react';
import { useMetrics } from '../../../metrics/hooks/useMetrics';
import { getTimeSerie, getRanking } from '../../../metrics/services/metrics.service';
import RankingList from '../../../metrics/ui/organisms/RankingList';
import TimeSeriesChart from '../../../metrics/ui/organisms/TimeSeriesChart';
import AggregatesSection from '../../../metrics/ui/organisms/AggregatesSection';

const DashboardPage: React.FC = () => {
  // --- Conexión a Datos Reales ---
  const { data: monthlySalesData, loading: loadingMonthlySales } = useMetrics(useCallback(() => getTimeSerie('sales', 'monthly-sales'), []));
  const { data: monthlyBalanceData, loading: loadingMonthlyBalance } = useMetrics(useCallback(() => getTimeSerie('transactions', 'monthly-balance'), []));

  const { data: bestSellingAllTime, loading: loadingBestSellingAllTime } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-all-time'), []));
  const { data: bestSellingCurrentMonth, loading: loadingBestSellingCurrentMonth } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-current-month'), []));
  // -----------------------------

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      {/* Sección de Agregados */}
      <AggregatesSection />

      {/* Sección de Rankings y Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart
          title="Ventas Mensuales"
          data={monthlySalesData?.data.map(d => ({ time: new Date(d.date).toLocaleString('default', { month: 'long' }), value: d.value })) ?? []}
          isLoading={loadingMonthlySales}
        />
        <TimeSeriesChart
          title="Balance Mensual"
          data={monthlyBalanceData?.data.map(d => ({ time: new Date(d.date).toLocaleString('default', { month: 'long' }), value: d.value })) ?? []}
          isLoading={loadingMonthlyBalance}
        />
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
