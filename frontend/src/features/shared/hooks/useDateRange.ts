import { useState } from 'react';

export const useDateRange = (initialRange: InitalDateRange) => {
  const [range] = useState<DateRange>(() => initialRange instanceof Array ? initialRange : initialRange());

  return range;
};
