const campaignModel = require("../model/campaignModel")
const donationModel=require("../model/donationModel")
const checkCampaignStatus = async (req, res, next) => {
    try {
        // Find all active campaigns
        const activeCampaigns = await campaignModel.find({ status: 'active' });

        // Loop through each campaign
        for (let campaign of activeCampaigns) {
            // Check if the campaign's end date has passed
            if (new Date() >= campaign.endDate) {
                // If the campaign's end date has passed, update the status to inactive
                campaign.status = 'inactive';
                await campaign.save();
            }
        }

        // Proceed to the next middleware or route handler
        next();
    } catch (error) {
        // Handle any errors that occur
        return res.status(500).json({ message: error.message });
    }
};


module.exports = checkCampaignStatus;
