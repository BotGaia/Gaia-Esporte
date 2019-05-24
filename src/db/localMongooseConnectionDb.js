const mongoose = require('mongoose');

module.exports = {
  connect: () => {
    mongoose.Promise = global.Promise;
    const options = {
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
<<<<<<< HEAD
      mongoose.connect('mongodb://mongoesporte:27017/gaiaesporte', options).then(() => {
=======
      mongoose.connect('mongodb://mongo:27017/gaiaesporte', options).then(() => {
>>>>>>> b337587eeb16590f92d1097e7de4e955c4c2eb5c
      }).catch();
    } else if (process.env.ENVIRONMENT === 'homolog') {
      mongoose.connect(`mongodb://${process.env.USER_DB}:${process.env.PASS_DB}@35.225.250.253/${process.env.DB}`,
        { useNewUrlParser: true }).then(() => {
      }).catch();
    }
  },
};
