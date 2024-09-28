const mongoose = require('mongoose');

const payOutSchema = new mongoose.Schema({
    donation: {
        type: Number,
        required: false, 
    },
    BankName: {
        type: String,
        required: true,
    },
    accountNumber: {
        type: String,
        required: true,
    },
    beneficiaryName: {
        type: String,
        required: true,
    },
    npo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'NPO',
        required: false,
    },
    campaign: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campaign', 
        required: false,
    }],
    
    
    status: {
        type: String,
        default: 'pending', 
    }
});

const payOutSchemaModel = mongoose.model('PayOut', payOutSchema);

module.exports = payOutSchemaModel;
