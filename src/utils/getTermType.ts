/**
 * 前期か後期かを判定しTermTypeを返す
 */
const getTermType = (): TermType => {
  // 後期(10/1 ~ 2/2)
  // 前期(4/1 ~ 7/31)
  const now = new Date();
  const month = now.getMonth() + 1;
  if (month >= 10 || month <= 2) {
    return 2;
  }
  return 1;
};
