const mongoose = require('mongoose'); 

// NPO Schema
const npoSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profilePic: { type: String },
    phoneNumber: { type: String, required: true, unique: true },
    organizationName: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    isVerified: { type: Boolean, default: false },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, enum: ['npo', 'admin'],default: 'npo' },
    blackList: [{ type: String }],
    address: { type: String },
    city: { type: String },
    state: { type: String },
    missionStatement: { type: String },
    campaigns: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Campaign' }],
   // individual: [{ type: mongoose.Schema.Types.ObjectId, ref: 'individual' }],
    totalRaised: { type: Number, default: 0 },
 
}, { timestamps: true });     

const npoModel = mongoose.model('npo', npoSchema);
module.exports = npoModel;



