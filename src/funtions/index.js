const exec = require("child_process").exec;
const task = require('windows-scheduler');
const fs = require('fs');

const getService = () => new Promise((resolve, reject) => {
    const {SERVICE_NAME} = process.env;
    exec(`sc query ${SERVICE_NAME}`, function (err, stdout) {
        if (err) {
            reject(err)
        }
        resolve(stdout.toString())
    });
});

const getTask = async () => {
    const {TASK_NAME} = process.env;
    return await task.get(TASK_NAME, "LIST", true)
};

const getFiles = async () => new Promise((resolve, reject) => {
    const {PATH_FILES} = process.env;
    fs.readdir(PATH_FILES, function (err, items) {
        if (err) {
            reject(err);
        }
        resolve(items);
    });
});

const func = {
    getFiles,
    getService,
    getTask,
};
module.exports = func;
