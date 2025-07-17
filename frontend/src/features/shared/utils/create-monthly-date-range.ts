export const createMonthlyDateRange = (): DateRange  => {
  const currentDate = new Date();
  const from = new Date(currentDate.getFullYear() - 1, 11, 31, 23, 59, 59, 0);
  const to = new Date(currentDate.getFullYear(), 11, 31, 23, 59, 59, 0);
  return [from, to];
};
