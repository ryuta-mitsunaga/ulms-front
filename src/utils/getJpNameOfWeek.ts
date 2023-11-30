export const dayOfWeekJp = ['日', '月', '火', '水', '木', '金', '土'];
export const getJpNameOfWeek = (date: Date): string => {
  const dayOfWeek = date.getDay();
  return dayOfWeekJp[dayOfWeek];
};
