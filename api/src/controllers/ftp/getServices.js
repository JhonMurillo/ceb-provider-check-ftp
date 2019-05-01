const inputValidation = require('../../middlewares/inputValidation');
const schema = require('./getServices.scheme');
const validate = inputValidation.validate(schema.schema);
const {providerModel} = require('../../helpers/db/mongo/model/service');


async function handler(req, res, next) {
  try {
    //Input
    const date = req.query.date;

    let service = providerModel.findOne({ date} )


    if (!service) {
        res.status(404).send();
    } 
    res.status(200).send(service);
  } catch (error) {
    return next(error);
  }
}

module.exports = [validate, handler];