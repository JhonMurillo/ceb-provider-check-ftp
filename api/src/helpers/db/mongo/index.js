const mongoose = require('mongoose');

mongoose.Promise = global.Promise;


const getCredentials = () => {
  //Mongo connection
  const {
    MONGO_DNS_SEEDLIST = false,
    MONGO_HOST = 'localhost',
    MONGO_PORT = 27017,
    MONGO_DATABASE,
    MONGO_USER,
    MONGO_PASSWORD
  } = process.env;

  let isMongoDnsSeedList = MONGO_DNS_SEEDLIST && MONGO_DNS_SEEDLIST.toString().toLowerCase() == 'true';

  const MONGO_URL = isMongoDnsSeedList ? `mongodb+srv://${MONGO_HOST}/${MONGO_DATABASE}` : `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DATABASE}`;
  return {
    MONGO_URL,
    MONGO_USER,
    MONGO_PASSWORD
  };
};

const connect = async () => {
  const mongoCredentials = helper.getCredentials();
  console.log(`Connecting to ${mongoCredentials.MONGO_URL}`);
  try {
    await mongoose
      .connect(mongoCredentials.MONGO_URL, {
        user: mongoCredentials.MONGO_USER,
        pass: mongoCredentials.MONGO_PASSWORD,
        reconnectTries: 30000,
        reconnectInterval: 1000,
        useNewUrlParser: true
      });

    console.log('Connected successfully to mongodb');

    const connection = mongoose.connection;
    connection.on('connecting', () => console.log('Connecting to mongodb'));
    connection.on('disconnecting', () => console.log('Disconnecting from mongodb'));
    connection.on('disconnected', () => console.log('Disconnected from mongodb'));
    connection.on('close', () => console.log('Mongodb connection closed'));
    connection.on('error', err =>
      console.log('Mongodb connection error', err.message)
    );
    connection.on('reconnected', () =>
      console.log('Mongodb connection reconnected')
    );

    return true;

  } catch (err) {
    console.log('Mongodb connection error', err.message);
    return false;
  }

};

const isConnected = () => {
  return mongoose.connection.readyState === 1 ? true : false;
}


const helper = {
  getCredentials,
  connect,
  isConnected,
};

module.exports = helper;