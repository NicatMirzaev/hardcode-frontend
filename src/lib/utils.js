export const calculatePercentage = (exp, requiredExp) => {
  const percentage = exp * 100 / requiredExp;
  return percentage.toString() + "%";
}

export const timestampToDate = timestamp => {
  const day = new Date(Number(timestamp)).getDate();
  const month = new Date(Number(timestamp)).getMonth() + 1;
  const year = new Date(Number(timestamp)).getFullYear();
  return day + "/" + month + "/" + year;
}
