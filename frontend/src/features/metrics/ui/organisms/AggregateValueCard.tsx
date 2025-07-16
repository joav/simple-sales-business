import React from 'react';
import Card from '../../../shared/ui/atoms/Card';
import Title from '../../../shared/ui/atoms/Title';
import Spinner from '../../../shared/ui/atoms/Spinner';

interface AggregateValueCardProps {
  title: string;
  value: number | string;
  isLoading?: boolean;
  icon?: React.ReactNode;
}

const AggregateValueCard: React.FC<AggregateValueCardProps> = ({ title, value, isLoading = false, icon }) => {
  return (
    <Card>
      <div className="flex items-center justify-between mb-2">
        <Title className="text-base font-medium text-gray-500">{title}</Title>
        {icon}
      </div>
      <div className="text-center">
        {isLoading ? (
          <Spinner />
        ) : (
          <p className="text-3xl font-bold text-gray-900">{typeof value === 'number' ? value.toLocaleString() : value}</p>
        )}
      </div>
    </Card>
  );
};

export default AggregateValueCard;
