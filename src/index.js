// Environment file path
const path = require('path');
const envPath = path.join(path.resolve(__dirname, '../'), '.env');
require('dotenv').config({ path: envPath });

//Imports
const worker = require('./worker');
const mongoose = require('./helpers/db/mongo');

try {
    mongoose.connect();
    worker.init();
} catch (error) {
    console.log(error);
    process.emit('SIGINT');
}

// // WINDOWS Process Shutdown
process.on('message', async msg => {
    if (msg == 'shutdown') {
        process.exit(0);
    }
});