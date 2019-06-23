/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const environment = require('../config/environment');

const should = chai.should();

describe('Environment', () => {
  it('should config gateway', (done) => {
    const currentEnv = process.env.ENVIRONMENT;
    const enviroments = [{ env: 'dev', URL: `http://${process.env.IP_ADDRESS}:3002` },
      { env: 'homolog', URL: 'https://gateway.hml.botgaia.ga' },
      { env: 'prod', URL: 'https://gateway.botgaia.ga' }];

    enviroments.forEach((value) => {
      process.env.ENVIRONMENT = value.env;
      environment.configSport();

      global.URL_GATEWAY.should.be.equal(value.URL);
    });

    process.env.ENVIRONMENT = currentEnv;
    environment.configSport();
    done();
  });
});
