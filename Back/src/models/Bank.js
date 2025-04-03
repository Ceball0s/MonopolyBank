const mongoose = require('mongoose');


const BankSchema = new mongoose.Schema({
    balance: { type: Number, default: 100000 },
    properties: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Property' }]
});

module.exports = mongoose.model('Bank', BankSchema);
