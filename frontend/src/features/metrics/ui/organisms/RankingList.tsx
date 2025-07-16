import React from 'react';
import Card from '../../../shared/ui/atoms/Card';
import Title from '../../../shared/ui/atoms/Title';
import Spinner from '../../../shared/ui/atoms/Spinner';

interface RankingItem {
  id: string;
  name: string;
  value: number;
}

interface RankingListProps {
  title: string;
  items: RankingItem[];
  isLoading?: boolean;
}

const RankingList: React.FC<RankingListProps> = ({ title, items, isLoading = false }) => {
  return (
    <Card>
      <Title className="mb-4">{title}</Title>
      {isLoading ? (
        <Spinner />
      ) : items && items.length > 0 ? (
        <ol className="space-y-2">
          {items.map((item, index) => (
            <li key={item.id} className="flex items-center justify-between text-sm">
              <span className="flex items-center">
                <span className="text-gray-500 font-semibold w-6 text-center mr-2">{index + 1}</span>
                <span>{item.name}</span>
              </span>
              <span className="font-bold text-gray-800">{item.value.toLocaleString()}</span>
            </li>
          ))}
        </ol>
      ) : (
        <p className="text-gray-500 text-sm">No hay datos disponibles.</p>
      )}
    </Card>
  );
};

export default RankingList;
