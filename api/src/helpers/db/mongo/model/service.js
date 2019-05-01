const mongoose = require('mongoose');
const schema = mongoose.Schema;

const serviceSchema = new schema({
    // uuid: { type: String, required: true },
    event: { type: Object, required: true },
    date: { type: String, required: true },
    createAt: { type: Date }
});

const serviceModel = mongoose.model('services', serviceSchema);

module.exports = {
    serviceModel
};