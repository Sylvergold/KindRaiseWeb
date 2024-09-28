const mongoose = require('mongoose');
const campaignSchema = new mongoose.Schema({
    title: { type: String, required: true }, 
    subtitle: String,
    story: String,
    Goal: { type: Number, required: true }, 
    ev: { type: Number,required:false,default:0},
    endDate: { type: Date, default: () => Date.now(), required: true }, 
    profilePic: { type: String, required: true },
    totalRaised: { type: Number, default: 0 },
    todaysDonation: { type: Number, default: 0 },                           
    monthlyDonation: { type: Number, default: 0 },
    lastDonationDate: { type: Date },
    status: { type: String, enum: ['active', 'inactive'], default: 'active' },
    isSponsored: Boolean,
    sponsoredAt: Date,
    individual: { type: mongoose.Schema.Types.ObjectId, ref: 'individual' },
    npo: { type: mongoose.Schema.Types.ObjectId, ref: 'npo' },
    donations: [{ type: mongoose.Schema.Types.ObjectId, ref: 'donation' }], 
    supporters: { type: Number, default: 0 }
}, { timestamps: true });

campaignSchema.virtual('lastDonationMonth').get(function() {
    if (this.lastDonationDate) {
        return new Date(this.lastDonationDate).toLocaleString('en-US', { month: 'short' });
    }
    return null;
});

campaignSchema.set('toJSON', { virtuals: true });
campaignSchema.set('toObject', { virtuals: true });

const CampaignModel = mongoose.model('Campaign', campaignSchema);
module.exports = CampaignModel;
