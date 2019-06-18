const Interval = require('../models/IntervalModel');

const Sports = [
  {
    name: 'Windsurf',
    temperatureInterval: [new Interval('24', '20'), new Interval('35', '30')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('15.42', '10.794'), new Interval('25.7', '21.074')],
  },
  {
    name: 'Kitesurf',
    temperatureInterval: [new Interval('24', '15')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('10.28', '0'), new Interval('25.7', '15.934')],
  },
  {
    name: 'Surf',
    temperatureInterval: [new Interval('35', '25')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('20.56', '10.794')],
  },
  {
    name: 'Stand Up Paddle',
    temperatureInterval: [new Interval('29', '20')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('20.56', '10.794')],
  },
  {
    name: 'Vela',
    temperatureInterval: [new Interval('24', '15'), new Interval('35', '30')],
    humidityInterval: [new Interval('70', '40')],
    windSpeedInterval: [new Interval('10.28', '0'), new Interval('25.78', '21.074')],
  },
  {
    name: 'Caiaque',
    temperatureInterval: [new Interval('29', '15')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('15.43', '0')],
  },
  {
    name: 'Wakeboard',
    temperatureInterval: [new Interval('24', '20'), new Interval('35', '30')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('25.72', '10.8')],
  },
  {
    name: 'sportTest2',
    temperatureInterval: [new Interval('3000', '3000')],
    humidityInterval: [new Interval('3000', '3000')],
    windSpeedInterval: [new Interval('3000', '3000')],
  },
  {
    name: 'Remo',
    temperatureInterval: [new Interval('19', '15'), new Interval('35', '30')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('20.57', '15.9')],
  },
  {
    name: 'Trekking',
    temperatureInterval: [new Interval('29', '25')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('20.57', '0')],
  },
  {
    name: 'Paraquedismo',
    temperatureInterval: [new Interval('29', '15')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('10.28', '0'), new Interval('25.72', '15.9')],
  },
  {
    name: 'Caminhada',
    temperatureInterval: [new Interval('19', '15')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('10.28', '0'), new Interval('20.57', '15.9')],
  },
  {
    name: 'Golf',
    temperatureInterval: [new Interval('35', '20')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('15.43', '10.8')],
  },
  {
    name: 'Tênis',
    temperatureInterval: [new Interval('19', '15'), new Interval('35', '25')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('20.57', '10.8')],
  },
  {
    name: 'Vôlei de areia',
    temperatureInterval: [new Interval('24', '20')],
    humidityInterval: [new Interval('70', '21')],
    windSpeedInterval: [new Interval('10.28', '0'), new Interval('20.57', '15.94')],
  },

];

module.exports = Sports;
