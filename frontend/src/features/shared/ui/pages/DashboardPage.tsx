import React from 'react';
import AggregatesSection from '../../../metrics/ui/organisms/AggregatesSection';
import RankingsSection from '../../../metrics/ui/organisms/RankingsSection';
import TimeSeriesSection from '../../../metrics/ui/organisms/TimeSeriesSection';

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      <AggregatesSection />

      {/* Sección de Rankings y Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesSection />
        <RankingsSection />
      </div>
    </div>
  );
};

export default DashboardPage;

