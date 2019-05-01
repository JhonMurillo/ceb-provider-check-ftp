const path = require('path');
require('dotenv').config({ path: `${path.dirname(__dirname)}/.env` });
const { NODE_ENV = 'development', PORT = 4000 } = process.env;


//Mongo
const mongo = require('./helpers/db/mongo');
mongo.connect();
//mongo.isConnected();

//Express Server
const app = require('./app');
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT} running ${NODE_ENV} environment`);
  mongo.isConnected();
});