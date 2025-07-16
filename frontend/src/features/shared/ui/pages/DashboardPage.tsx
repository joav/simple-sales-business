import React from 'react';
import { useMetrics } from '../../../metrics/hooks/useMetrics';
import { getAggregateValue, getTimeSerie, getRanking } from '../../../metrics/services/metrics.service';
import AggregateValueCard from '../../../metrics/ui/organisms/AggregateValueCard';
import RankingList from '../../../metrics/ui/organisms/RankingList';
import TimeSeriesChart from '../../../metrics/ui/organisms/TimeSeriesChart';

const DashboardPage: React.FC = () => {
  // --- Conexión a Datos Reales ---
  const { data: productsWithStock, loading: loadingWithStock } = useMetrics(() => getAggregateValue('products', 'products-with-stock'));
  const { data: productsWithoutStock, loading: loadingWithoutStock } = useMetrics(() => getAggregateValue('products', 'products-without-stock'));
  const { data: monthSales, loading: loadingMonthSales } = useMetrics(() => getAggregateValue('sales', 'current-month-sales'));
  const { data: monthEarnings, loading: loadingMonthEarnings } = useMetrics(() => getAggregateValue('sales', 'current-month-earnings'));

  const { data: monthlySalesData, loading: loadingMonthlySales } = useMetrics(() => getTimeSerie('sales', 'monthly-sales'));
  const { data: monthlyBalanceData, loading: loadingMonthlyBalance } = useMetrics(() => getTimeSerie('transactions', 'monthly-balance'));

  const { data: bestSellingAllTime, loading: loadingBestSellingAllTime } = useMetrics(() => getRanking('products', 'best-selling-products-all-time'));
  const { data: bestSellingCurrentMonth, loading: loadingBestSellingCurrentMonth } = useMetrics(() => getRanking('products', 'best-selling-products-current-month'));
  // -----------------------------

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      {/* Sección de Agregados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <AggregateValueCard
          title="Productos con stock"
          value={productsWithStock?.aggregateValue ?? 0}
          isLoading={loadingWithStock}
        />
        <AggregateValueCard
          title="Productos sin stock"
          value={productsWithoutStock?.aggregateValue ?? 0}
          isLoading={loadingWithoutStock}
        />
        <AggregateValueCard
          title="Total vendido Mes Actual"
          value={monthSales ? `$ ${monthSales.aggregateValue}` : '$ 0'}
          isLoading={loadingMonthSales}
        />
        <AggregateValueCard
          title="Total ganancias Mes Actual"
          value={monthEarnings ? `$ ${monthEarnings.aggregateValue}` : '$ 0'}
          isLoading={loadingMonthEarnings}
        />
      </div>

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
