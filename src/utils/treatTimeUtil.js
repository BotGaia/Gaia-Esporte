module.exports = {

  getDateTime: () => {
    const today = new Date();
    let time = today.getHours() - 3;
    let weekDay = today.getDay();
    if (time <= 0) {
      if (time === -1) {
        time = 23;
        weekDay -= 1;
      } else if (time === -2) {
        time = 22;
        weekDay -= 1;
      } else if (time === -3) {
        time = 21;
        weekDay -= 1;
      }
    }

    return (weekDay);
  },

  getDateInfo: () => {
    const date = new Date();
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    return [day, month, year];
  },
};
