const validateExpirationDate = (month, year, currentDate) => {
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  if (year === String(currentYear) && month < currentMonth) {
    return "EXPIRED";
  }
};

export default validateExpirationDate;
