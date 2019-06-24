/* eslint-disable import/no-unresolved */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const chai = require('chai');

const should = chai.should();
const Local = require('../models/LocalModel.js');

describe('Local Model', () => {
  it('should set name', () => {
    const newLocal = new Local();
    newLocal.setName('name');
    should.equal(newLocal.getName(), 'name');
  });

  it('should set latitude', () => {
    const newLocal = new Local();
    newLocal.setLatitude('lat');
    should.equal(newLocal.getLatitude(), 'lat');
  });

  it('should set longitude', () => {
    const newLocal = new Local();
    newLocal.setLongitude('lng');
    should.equal(newLocal.getLongitude(), 'lng');
  });
});
