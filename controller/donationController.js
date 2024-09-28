const mongoose = require("mongoose")
const donationModel = require("../model/donationModel")
const campaignModel = require("../model/campaignModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")
const messageModel = require("../model/messageModel")
const sendmail = require("../helpers/nodemailer")
const { donationTemplate, campaignCreatorTemplate } = require("../helpers/html")


const getDonationById = async (req, res) => {
  try {
    const { donationId } = req.params;
    const { id } = req.user;

    if (!mongoose.Types.ObjectId.isValid(donationId)) {
      return res.status(400).json({ error: "Invalid donation ID format." });
    }

    const donation = await donationModel.findById(donationId).populate('campaign');
    if (!donation) {
      return res.status(404).json({ error: "Donation not found" });
    }

    // Check if the requesting user is the creator of the campaign
    const campaign = donation.campaign;
    if (campaign.individual && campaign.individual.toString() !== id) {
      return res.status(403).json({ message: "You can only view donations for the campaign you created." });
    }
    if (campaign.npo && campaign.npo.toString() !== id) {
      return res.status(403).json({ message: "You can only view donations for the campaign you created." });
    }

    const campaignTitle = campaign ? campaign.title : "Unknown campaign";
    return res.status(200).json({
      message: `Below are the details of the donation for campaign titled '${campaignTitle}'`,
      donation
    });
  } catch (error) {
    console.error('Error fetching donation:', error);
    return res.status(500).json({ error: `Failed to fetch donation: ${error.message}` });
  }
};
const getAllDonation = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { id } = req.user;

    // Validate campaign ID
    if (!mongoose.Types.ObjectId.isValid(campaignId)) {
      return res.status(400).json({ error: "Invalid campaign ID format." });
    }

    // Fetch the campaign to verify ownership
    const campaign = await campaignModel.findById(campaignId);
    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    if (campaign.individual && campaign.individual.toString() !== id) {
      return res.status(403).json({ message: "You can only view donations for the campaign you created." });
    }
    if (campaign.npo && campaign.npo.toString() !== id) {
      return res.status(403).json({ message: "You can only view donations for the campaign you created." });
    }

    // Fetch donations for the campaign
    const donations = await donationModel.find({ campaign: campaignId }).populate("campaign");
    if (!donations || donations.length === 0) {
      return res.status(404).json({ error: "No donations found for this campaign" });
    }

    return res.status(200).json({
      message: `Here are the ${donations.length} donations made to the campaign titled '${campaign.title}'`,
      donations
    });
  } catch (error) {
    console.error('Error fetching donations:', error);
    return res.status(500).json({ error: `Failed to get all donations: ${error.message}` });
  }
};
const createDonation = async (req, res) => {
  try {
    const { campaignId } = req.params;
    const { amount, name, email, message } = req.body; 

    if (!amount || !name || !email) {
      return res.status(400).json({ error: "All fields are required." });
    }

    // Find the campaign by ID
    const campaign = await campaignModel.findById(campaignId)
      .populate('individual', 'email')  // Ensure we have the email
      .populate('npo', 'email');

    if (!campaign) {
      return res.status(404).json({ error: "Campaign not found" });
    }

    let newDonation;

    // Determine if the donation is for an individual or NPO
    if (campaign.individual) {
      newDonation = new donationModel({
        amount,
        name: name || 'anonymous',
        email,
        message,
        campaignName: campaign.title, // Use the title from the campaign
        campaign: campaignId,
        individual: campaign.individual._id
      });
    } else if (campaign.npo) {
      newDonation = new donationModel({
        amount,
        name: name || 'anonymous',
        email,
        message,
        campaignName: campaign.title, // Use the title from the campaign
        campaign: campaignId,
        npo: campaign.npo._id
      });
    }

    // Save the new donation
    await newDonation.save();

    // Update the campaign's donations array and financial details
    campaign.donations.push(newDonation._id); // Push the donation ID
    campaign.totalRaised += Number(amount);
    campaign.supporters = (campaign.supporters || 0) + 1;

    // Check if today's donation (within last 24 hours)
    const today = new Date();
    const oneDayAgo = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    campaign.todaysDonation = newDonation.createdAt >= oneDayAgo ? campaign.totalRaised : campaign.todaysDonation;

    const lastDonationDate = campaign.lastDonationDate || new Date(0); // Default date if null

    // Reset monthly donation if the month has changed
    if (today.getMonth() !== lastDonationDate.getMonth() || today.getFullYear() !== lastDonationDate.getFullYear()) {
      campaign.monthlyDonation = 0;
    }

    // Add the current donation to the monthly total
    campaign.monthlyDonation += Number(amount);
    campaign.lastDonationDate = today;

    // Save the updated campaign
    await campaign.save();

    // Send email to the donor campaignTitle
    await sendmail({
      email: newDonation.email,
      subject: 'Thank You for Your Donation!',
      html: donationTemplate(newDonation.name, amount, campaign.title, new Date().toLocaleDateString(), campaignId),
    });

    // Email to campaign creator
    const campaignCreatorEmail = campaign.individual?.email || campaign.npo?.email;
    if (campaignCreatorEmail) {
      await sendmail({
        email: campaignCreatorEmail,
        subject: 'DONATION ALERT!',
        html: campaignCreatorTemplate(campaign.title),
      });
    }

    // Respond with success
    return res.status(201).json({
      message: `Dear ${newDonation.name}, thank you for your donation of ₦${newDonation.amount} to the ${campaign.title} campaign!`,
      newDonation
    });

  } catch (error) {
    console.error('Error creating donation or sending email:', error);
    return res.status(500).json({ error: `Failed to create donation: ${error.message}` });
  }
};
const trackDonationHistory = async (req, res) => {
  const userId = req.user._id;
  console.log(userId)
  let donations;
  try {
    // 
    donations = await donationModel.find({ individual: userId })
      .select("amount name message email timestamps")
      .populate("campaign", "title")
      .sort({ createdAt: -1 });

    // If donations for individual exist, return them
    if (donations.length) {
      return res.status(200).json({
        message: `Successfully retrieved donation history for individual ${userId}`,
        donations
      });
    }
     donations = await donationModel.find({
      npo: userId
    })
      .select("amount name message email createdAt")
      .populate("campaign", "title")
      .sort({ createdAt: -1 });
      donations=donations.map(donation=>({
        ...donation._doc,
        donationDate:new Date(donation.createdAt).toLocaleDateString('en-Us')
      }))
      if (donations.length === 0) {
      return res.status(404).json({ message: `No donation history found for user ${userId}` });
    }
    return res.status(200).json({
      message: `Successfully retrieved donation history for user`,
      donations
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
const NpoManagement = async (req, res) => {
  try {
    const { donorId } = req.params; 
    const { message } = req.body; 
    const donor = await donationModel.findById(donorId).populate("campaign");
    if (!donor) {
      return res.status(404).json({ message: 'Donor not found for the specified donation' });
    }
    const campaign = donor.campaign;
    if (!campaign) {
      return res.status(404).json({ message: 'Campaign not found' });
    }
    const Nporeceiver = campaign.npo;
    if (!Nporeceiver || Nporeceiver.toString() !== req.user._id.toString()) {
      return res.status(401).json({ info: 'Only the NPO campaign creator can perform this action' });
    }
    const Npomanagement = new messageModel({
      campaign: campaign._id,
      donor: donorId,
      campaignCreator: campaign.npo,
      Nporeceiver,
      message,
    });

    await Npomanagement.save();
    await sendmail({
      email: donor.email,
      subject: 'Message from the Campaign You Donated To',
      html: `<p>Hello, ${message}</p>`,
    });
     res.status(200).json({ message: `Campaign creator successfully sent a message to ${donor.email}` });
  } catch (error) {
    console.error('Error sending message:', error);
    res.status(500).json({ message: `Cannot send message because: ${error.message}` });
  }
};

module.exports = {
  createDonation,
  getDonationById,
  getAllDonation,
  NpoManagement,
  trackDonationHistory,
};
