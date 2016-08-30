export const calculateStartOfWeek = (startOfWeek, change) => {
  const newDate = startOfWeek.clone();
  if (change !== 0) {
    newDate.add(change * 7, 'days');
  }
  return newDate;
};

export const formatDate = momentDate =>
 momentDate.format('YYYY-MM-DD');
