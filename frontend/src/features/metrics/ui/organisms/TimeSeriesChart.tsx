import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import Card from '../../../shared/ui/atoms/Card';
import Title from '../../../shared/ui/atoms/Title';
import Spinner from '../../../shared/ui/atoms/Spinner';

interface TimeSeriesData {
  time: string;
  value: number;
}

interface TimeSeriesChartProps {
  title: string;
  data: TimeSeriesData[];
  isLoading?: boolean;
}

const TimeSeriesChart: React.FC<TimeSeriesChartProps> = ({ title, data, isLoading = false }) => {
  return (
    <Card>
      <Title className="mb-4">{title}</Title>
      {isLoading ? (
        <div className="h-64 flex items-center justify-center">
          <Spinner />
        </div>
      ) : data && data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="value" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <p className="text-gray-500">No hay datos disponibles.</p>
        </div>
      )}
    </Card>
  );
};

export default TimeSeriesChart;
