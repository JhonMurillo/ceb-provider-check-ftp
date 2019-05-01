const schedule = require('node-schedule');
const moment = require('moment');
const func = require("../src/funtions/index")
const {serviceModel} = require("../src/helpers/db/mongo/model/service")

let ruleMain = {};
ruleMain.minute = 05;


const loop = schedule.scheduleJob(`00 00 06 * * *`, async () => {
    console.log('Loop ' + moment().format('MM/DD/YYYY HH:mm:ss'));
    let service = null
    try {
        service = await func.getService();
        service = parseStringToObject(service.replace(/\r\n/g, ',').slice(1))
    } catch (error) {
        console.log(error);
        service = error;
    }
    let task = null
    try {
        task = await func.getTask();
        task = (task.replace(/\r\n/g, ',').slice(1))
    } catch (error) {
        console.log(error);
        task = error;
    }

    let files = []
    try {
        files = await func.getFiles();
    } catch (error) {
        console.log(error);
    }
    await serviceModel.create(
        {
            date: moment().format('MM/DD/YYYY'),
            createAt: moment(),
            event: {
                service,
                task,
                files,
            }
        })
});

const parseStringToObject = (string) => {
    var properties = string.split(', ');
    var obj = {};
    properties.forEach(function (property) {
        var tup = property.split(':');
        obj[tup[0]] = tup[1];
    });
    return obj;
}

const init = async () => {
    process.on('ready', async () => {
        await workerModule.loop();
    });
};

const workerModule = {
    init,
    loop,
};
module.exports = workerModule;