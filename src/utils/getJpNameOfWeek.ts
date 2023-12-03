export const dayOfWeekJp = ['月', '火', '水', '木', '金', '土', '日'];
export const getJpNameOfWeek = (date: Date): string => {
  const dayOfWeek = date.getDay();
  return dayOfWeekJp[dayOfWeek];
};
