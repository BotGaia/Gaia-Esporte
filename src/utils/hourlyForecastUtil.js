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

    if (hoursAhead === 'invalid') {
      return 'invalid';
    }

    const n = hoursAhead / 3;
    const forecastNumber = Math.round(n);

    return weatherArray[forecastNumber];
  },
  getHoursAhead,
};
