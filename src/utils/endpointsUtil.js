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
    ];

    return endpoints;
  },
};
