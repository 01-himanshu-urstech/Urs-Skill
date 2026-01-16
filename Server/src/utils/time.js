// IST = UTC + 5:30
export const getISTDate = () => {
  const now = new Date();
  return new Date(now.getTime() + 5.5 * 60 * 60 * 1000);
};

export const convertISTToUTC = (date) => {
  // date is assumed IST
  return new Date(new Date(date).getTime() - 5.5 * 60 * 60 * 1000);
};
