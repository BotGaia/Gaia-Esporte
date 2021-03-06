const treat = require('../utils/treatmentWeatherUtil');

module.exports = class Weather {
  constructor(JsonData, type) {
    this.date = treat.treatDate(JsonData.dt, 'forecast');
    this.sky = treat.treatSky(JsonData.weather[0].description);
    this.temperature = treat.treatTemperature(JsonData.main.temp);
    this.pressure = treat.treatPressure(JsonData.main.pressure);
    this.windyDegrees = treat.treatWind(JsonData.wind.deg);
    this.windySpeed = JsonData.wind.speed.toString();
    this.temperatureMax = treat.treatTemperature(JsonData.main.temp_max);
    this.temperatureMin = treat.treatTemperature(JsonData.main.temp_min);
    this.humidity = JsonData.main.humidity.toString();

    if (type === 'weather') {
      this.name = JsonData.name;
      this.sunrise = treat.treatDate(JsonData.sys.sunrise, 'weather');
      this.sunset = treat.treatDate(JsonData.sys.sunset, 'weather');
    }
  }
};
