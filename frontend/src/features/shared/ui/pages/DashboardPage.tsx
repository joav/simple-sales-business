import React from 'react';
import AggregateValueCard from '../../../metrics/ui/organisms/AggregateValueCard';
import RankingList from '../../../metrics/ui/organisms/RankingList';
import TimeSeriesChart from '../../../metrics/ui/organisms/TimeSeriesChart';

// --- Datos de Ejemplo ---
const aggregateValues = [
  { key: 'products-with-stock', title: 'Productos con stock', value: 150 },
  { key: 'products-without-stock', title: 'Productos sin stock', value: 20 },
  { key: 'current-month-sales', title: 'Total vendido Mes Actual', value: '$ 120.500' },
  { key: 'current-month-earnings', title: 'Total ganancias Mes Actual', value: '$ 45.000' },
  { key: 'current-balance', title: 'Balance de mi negocio', value: '-$ 80.000' },
  { key: 'current-cash-balance', title: 'Saldo de mi negocio', value: '$ 250.500' },
];

const bestSellingProductsAllTime = [
  { id: '1', name: 'Producto A', value: 100 },
  { id: '2', name: 'Producto C', value: 80 },
  { id: '3', name: 'Producto H', value: 30 },
  { id: '4', name: 'Producto D', value: 30 },
  { id: '5', name: 'Producto F', value: 10 },
];

const bestSellingProductsCurrentMonth = [
  { id: '1', name: 'Producto B', value: 30 },
  { id: '2', name: 'Producto A', value: 10 },
  { id: '3', name: 'Producto G', value: 10 },
  { id: '4', name: 'Producto E', value: 5 },
  { id: '5', name: 'Producto C', value: 2 },
];

const monthlySalesData = [
  { time: 'Enero', value: 12000 },
  { time: 'Febrero', value: 15000 },
  { time: 'Marzo', value: 18000 },
  { time: 'Abril', value: 16000 },
  { time: 'Mayo', value: 21000 },
  { time: 'Junio', value: 25000 },
];

const monthlyBalanceData = [
  { time: 'Enero', value: 5000 },
  { time: 'Febrero', value: 7000 },
  { time: 'Marzo', value: 6000 },
  { time: 'Abril', value: 8000 },
  { time: 'Mayo', value: 9000 },
  { time: 'Junio', value: 12000 },
];
// -----------------------

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Principal</h1>

      {/* Sección de Agregados */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        {aggregateValues.map((metric) => (
          <AggregateValueCard key={metric.key} title={metric.title} value={metric.value} />
        ))}
      </div>

      {/* Sección de Rankings y Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TimeSeriesChart title="Ventas Mensuales" data={monthlySalesData} key="monthly-sales" />
        <TimeSeriesChart title="Balance Mensual" data={monthlyBalanceData} key="monthly-balance" />
        <RankingList
          title="Productos más vendidos (histórico)"
          items={bestSellingProductsAllTime}
          key="best-selling-products-all-time"
        />
        <RankingList
          title="Productos más vendidos (mes actual)"
          items={bestSellingProductsCurrentMonth}
          key="best-selling-products-current-month"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
