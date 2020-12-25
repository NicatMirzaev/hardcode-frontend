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

export const abbreviateNumber = number => {

    // what tier? (determines SI symbol)
    const SI_SYMBOL = ["", "k", "M", "G", "T", "P", "E"];
    const tier = Math.log10(number) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier == 0) return number;

    // get suffix and determine scale
    const suffix = SI_SYMBOL[tier];
    let scale = Math.pow(10, tier * 3);

    // scale the number
    let scaled = number / scale;

    // format number and add suffix
    return scaled.toFixed(1) + suffix;
}
