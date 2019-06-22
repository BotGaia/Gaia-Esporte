module.exports = {
  configGateway: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_GATEWAY = `http://${process.env.IP_ADDRESS}:3002/`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_GATEWAY = 'https://gateway.hml.botgaia.ga/';
    } else {
      global.URL_GATEWAY = 'https://gateway.botgaia.ga/';
    }
  },
};
