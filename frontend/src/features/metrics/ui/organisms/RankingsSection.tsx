import React, { useCallback } from 'react';
import { useMetrics } from '../../hooks/useMetrics';
import { getRanking } from '../../services/metrics.service';
import RankingList from './RankingList';

const RankingsSection: React.FC = () => {
  const { data: bestSellingAllTime, loading: loadingBestSellingAllTime } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-all-time'), []));
  const { data: bestSellingCurrentMonth, loading: loadingBestSellingCurrentMonth } = useMetrics(useCallback(() => getRanking('sales', 'best-selling-products-current-month'), []));

  return (
    <>
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
    </>
  );
};

export default RankingsSection;
