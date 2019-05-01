const joiBase = require('joi');
const joiDateExtension = require('joi-date-extensions');
const joi = joiBase.extend(joiDateExtension);
const schema = {
    query: {
        dateCurrent: joi.date().format('MM/DD/YYYY').required().description('Date'),
    }
};

module.exports = { schema };