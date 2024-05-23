export const timeConverter = (convertData: string) => {
  if (convertData) {
  return  `${new Intl.DateTimeFormat('en-UK', {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    }).format(new Date(convertData))}`;
  }
};

export const formatNumber = (num: number) => {
  if (+num >= 1000) {
    return num.toLocaleString();
  } else return num;
};
