const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    default: 'anonymous'
  },
  email: {
    type: String,
    required: true

  },
  campaignName: {
    type: String, required: false, default: null
  },

  message: {
    type: String,  
    required: false
  },

  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Campaign"
  },
  individual: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "individual"
  },
  npo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "npo"
  },

}, { timestamps: true });



const donationModel = mongoose.model('donation', donationSchema);
module.exports = donationModel;



