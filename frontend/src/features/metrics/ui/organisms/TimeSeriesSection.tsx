import React, { useCallback } from 'react';
import { useMetrics } from '../../../metrics/hooks/useMetrics';
import { getTimeSerie } from '../../../metrics/services/metrics.service';
import TimeSeriesChart from '../../../metrics/ui/organisms/TimeSeriesChart';
import { createMonthlyDateRange } from '../../../shared/utils/create-monthly-date-range';

const TimeSeriesSection: React.FC = () => {
  const [ from, to ] = useCallback(() => createMonthlyDateRange(), [])();
  const { data: monthlySalesData, loading: loadingMonthlySales } = useMetrics(useCallback(() => getTimeSerie('sales', 'monthly-sales', from, to), []));
  const { data: monthlyBalanceData, loading: loadingMonthlyBalance } = useMetrics(useCallback(() => getTimeSerie('transactions', 'monthly-balance', from, to), []));

  return (
    <>
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
    </>
  );
};

export default TimeSeriesSection;
