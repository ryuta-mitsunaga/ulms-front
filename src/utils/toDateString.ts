/** MMDDの文字列に日付を変換する */
export const toMMDD = (dateData: DateData): string => {
  const month = dateData.month;
  const day = dateData.day;
  const jpWeek = dateData.jpWeek;

  return `${month}月${day}日(${jpWeek})`;
};

/** 0埋め */
export const paddingToZero = (num: number): string => {
  return ('0' + num).slice(-2);
};
