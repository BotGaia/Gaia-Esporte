module.exports = {
  getTargetTime(hours, minutes, minutesBefore, hoursBefore) {
    let targetHours = 0;
    let targetMinutes = 0;
    let minutesTotal = 0;

    minutesTotal = ((hours * 60) + minutes) - (hoursBefore * 60 + minutesBefore);
    targetHours = Math.trunc(minutesTotal / 60);
    targetMinutes = Math.ceil(((minutesTotal / 60) - targetHours) * 60);
    if (targetHours <= 0) {
      targetHours += 24;
    }
    if (targetMinutes < 0) {
      targetHours = Math.trunc(((targetHours * 60) + targetMinutes) / 60);
      targetMinutes = Math.abs(Math.ceil(targetMinutes));
    }
    if (targetHours === 24) {
      targetHours = 0;
    }
    return [targetHours, targetMinutes];
  },
};
