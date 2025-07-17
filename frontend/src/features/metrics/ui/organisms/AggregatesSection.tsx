import React, { useCallback } from 'react';
import { useMetrics } from '../../../metrics/hooks/useMetrics';
import { getAggregateValue } from '../../../metrics/services/metrics.service';
import AggregateValueCard from '../../../metrics/ui/organisms/AggregateValueCard';

const AggregatesSection: React.FC = () => {
  const { data: productsWithStock, loading: loadingWithStock } = useMetrics(useCallback(() => getAggregateValue('products', 'with-stock'), []));
  const { data: productsWithoutStock, loading: loadingWithoutStock } = useMetrics(useCallback(() => getAggregateValue('products', 'without-stock'), []));
  const { data: monthSales, loading: loadingMonthSales } = useMetrics(useCallback(() => getAggregateValue('sales', 'current-month'), []));
  const { data: monthEarnings, loading: loadingMonthEarnings } = useMetrics(useCallback(() => getAggregateValue('sales', 'current-month-earnings'), []));
  const { data: currentBalance, loading: loadingCurrentBalance } = useMetrics(useCallback(() => getAggregateValue('transactions', 'current-balance'), []));
  const { data: currentCashBalance, loading: loadingCurrentCashBalance } = useMetrics(useCallback(() => getAggregateValue('transactions', 'current-cash-balance'), []));

  return (
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
        value={monthSales ? `$ ${monthSales.aggregateValue.toLocaleString('de')}` : '$ 0'}
        isLoading={loadingMonthSales}
      />
      <AggregateValueCard
        title="Total ganancias Mes Actual"
        value={monthEarnings ? `$ ${monthEarnings.aggregateValue.toLocaleString('de')}` : '$ 0'}
        isLoading={loadingMonthEarnings}
      />
      <AggregateValueCard
        title="Balance actual del negocio"
        value={currentBalance ? `$ ${currentBalance.aggregateValue.toLocaleString('de')}` : '$ 0'}
        isLoading={loadingCurrentBalance}
      />
      <AggregateValueCard
        title="Saldo actual del negocio"
        value={currentCashBalance ? `$ ${currentCashBalance.aggregateValue.toLocaleString('de')}` : '$ 0'}
        isLoading={loadingCurrentCashBalance}
      />
    </div>
  );
};

export default AggregatesSection;
