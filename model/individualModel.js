const mongoose = require('mongoose');
// Individual Schema
const individualSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phoneNumber: { type: String },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  //scamThreat: { type: Boolean, default: false }
  profilePic: { type: String },
  blackList: [{ type: String }],
  address: { type: String },
  city: { type: String },
  state: { type: String },
  missionStatement: { type: String },
  isVerified: { type: Boolean, default: false },
  isAdmin: { type: Boolean, default: false },
  role: { type: String, enum: ['individual', 'admin'], default: 'individual' },
  campaign: {
    type: mongoose.Schema.ObjectId,
    ref: "Campaign"
  },
  donation: {
    type: mongoose.Schema.ObjectId,
    ref: "donation"
  },
  npo: {
    type: mongoose.Schema.ObjectId,
    ref: "npo"
  }
}, { timestamps: true });

const individualModel = mongoose.model('individual', individualSchema);
module.exports = individualModel;