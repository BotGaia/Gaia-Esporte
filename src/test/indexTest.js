/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../index');

const should = chai.should();

chai.use(chaiHttp);

describe('Index', () => {
  it('should get in root', (done) => {
    chai.request(app).get('/').end((err, res) => {
      res.should.have.status(200);
      done();
    });
  });
});
