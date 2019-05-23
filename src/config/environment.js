module.exports = {
  configLocal: () => {
    if (process.env.ENVIRONMENT === 'dev') {
      global.URL_LOCAL = `http://${process.env.IP_ADDRESS}:3001`;
    } else if (process.env.ENVIRONMENT === 'homolog') {
      global.URL_LOCAL = 'http://local.hml.botgaia.ga';
    } else {
      global.URL_LOCAL = 'https://local.botgaia.ga';
    }
  },
};
