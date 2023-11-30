/** MMDDの文字列に日付を変換する */
export const toMMDD = (dateData: DateData): string => {
  const month = dateData.month;
  const day = dateData.day;
  const jpWeek = dateData.jpWeek;

  return `${month}月${day}日(${jpWeek})`;
};
