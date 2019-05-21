const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.Promise = global.Promise;
    const options = {
      user: 'wendylocal',
      pass: 'admin123',
      keepAlive: true,
      socketTimeoutMS: 540000,
      autoReconnect: true,
      reconnectTries: Number.MAX_VALUE,
      autoIndex: false,
      reconnectInterval: 500,
      poolSize: 10,
      bufferMaxEntries: 0,
      useNewUrlParser: true,
    };

    if (process.env.ENVIRONMENT === 'dev') {
      mongoose.connect('mongodb://mongo:27017/admin', options).then(() => {
      }).catch();
    } else if (process.env.ENVIRONMENT === 'homolog') {
      mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.188.16.121/${process.env.DB}`,
        { useNewUrlParser: true }).then(() => {
      }).catch();
    }
  },
};
