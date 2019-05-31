module.exports = {
  getJson: () => {
    const endpoints = [
      {
        type: 'GET',
        endpoint: '/local',
        parameters: [
          {
            name: 'local',
            type: 'string',
          },
        ],
        description: 'Receives a location and return its coordinates',
      },
      {
        type: 'GET',
        endpoint: '/listLocales',
        parameters: [
          {
            name: 'local',
            type: 'string',
          },
        ],
        description: 'Receives a location and returns a list with all possible locations',
      },
      {
        type: 'GET',
        endpoint: '/climate',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Receives a location and returns its weather conditions',
      },
      {
        type: 'GET',
        endpoint: '/forecast',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Receives a location and returns its weather conditions for 5 days in the future',
      },
      {
        type: 'GET',
        endpoint: '/climateForecast',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
          {
            name: 'date',
            type: 'string',
          },
        ],
        description: 'Receives a location and a date and returns the weather conditions for that date and place',
      },
      {
        type: 'POST',
        endpoint: '/sportForecast',
        JSON: {
          days: 'Array',
          locals: 'Array',
          telegramId: 'String',
          sport: 'String',
          hour: 'Integer',
          minutes: 'Integer',
          hoursBefore: 'Integer',
          minutesBefore: 'Integer',
          date: 'String',
        },
        description: 'Receives a notification object and a date and returns the favorability of the sport and a weather object for each location.',
      },
      {
        type: 'GET',
        endpoint: '/sports',
        parameters: [
          {
            name: 'place',
            type: 'string',
          },
        ],
        description: 'Receives a location and returns favorable sports, sports with reservation and sports with alert for the given location',
      },
      {
        type: 'GET',
        endpoint: '/allSports',
        parameters: [],
        description: 'Returns all the sports in the database',
      },
      {
        type: 'POST',
        endpoint: '/createNotification',
        JSON: {
          telegramId: 'String',
          days: 'Array',
          minutesBefore: 'Integer',
          hoursBefore: 'Integer',
          hour: 'Integer',
          minutes: 'Integer',
          sport: 'String',
          locals: 'Array',
        },
        description: 'Saves a notification in the system',
      },
    ];

    return endpoints;
  },
};
