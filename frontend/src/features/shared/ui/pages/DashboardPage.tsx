import React from 'react';
import AggregateValueCard from '../../../metrics/ui/organisms/AggregateValueCard';
import RankingList from '../../../metrics/ui/organisms/RankingList';
import TimeSeriesChart from '../../../metrics/ui/organisms/TimeSeriesChart';

// --- Datos de Ejemplo ---
const aggregateValues = [
  { title: 'Ventas Totales', value: 75230 },
  { title: 'Nuevos Clientes', value: 124 },
  { title: 'Tasa de Conversión', value: '3.5%' },
];

const rankingItems = [
  { id: '1', name: 'Producto A', value: 150 },
  { id: '2', name: 'Producto B', value: 125 },
  { id: '3', name: 'Producto C', value: 98 },
  { id: '4', name: 'Producto D', value: 75 },
  { id: '5', name: 'Producto E', value: 60 },
];

const timeSeriesData = [
  { time: 'Lunes', value: 2400 },
  { time: 'Martes', value: 1398 },
  { time: 'Miércoles', value: 9800 },
  { time: 'Jueves', value: 3908 },
  { time: 'Viernes', value: 4800 },
  { time: 'Sábado', value: 3800 },
  { time: 'Domingo', value: 4300 },
];
// -----------------------

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      {/* Sección de Agregados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {aggregateValues.map((metric) => (
          <AggregateValueCard key={metric.title} title={metric.title} value={metric.value} />
        ))}
      </div>

      {/* Sección de Rankings y Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TimeSeriesChart title="Ventas de la Semana" data={timeSeriesData} />
        </div>
        <div>
          <RankingList title="Top 5 Productos" items={rankingItems} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
