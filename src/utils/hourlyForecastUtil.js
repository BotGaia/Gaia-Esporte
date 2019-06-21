function getHoursAhead(dateAhead) {
  const today = new Date();
  today.setHours(today.getHours() - 3);

  const hoursAhead = (dateAhead.getTime() - today.getTime()) / (60 * 60 * 1000);

  if (hoursAhead > 120 || hoursAhead <= 0) {
    return 'invalid';
  }
  return Math.ceil(hoursAhead);
}

module.exports = {
  getHourlyForecast: (weatherArray, date) => {
    const hoursAhead = getHoursAhead(date);
    console.log("hoursAhead")
    console.log(hoursAhead)
    console.log(date)
    if (hoursAhead === 'invalid') {
      return 'Formato inválido! Tente da seguinte maneira: AAAA-MM-DD. Formato do horário: THH%3AMM';
    }

    const n = hoursAhead / 3;
    const forecastNumber = Math.round(n);

    return weatherArray[forecastNumber];
  },
  getHoursAhead,
};
