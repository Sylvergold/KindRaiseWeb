const campaignModel = require("../model/campaignModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")

const fs = require('fs');
const path = require('path');

const messageModel = require("../model/messageModel")
const sendmail = require("../helpers/html")
const donationModel = require("../model/donationModel")
const cloudinary = require("../utilis/cloudinary")
const twoYearsFromNow = new Date();
twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);


exports.createCampaignByNpo = async (req, res) => {
    try {
        const { title, subtitle, story, Goal, endDate, ev } = req.body;
        const npoId = req.user.id;

        if (!title || !story || !Goal || !endDate) {
            return res.status(400).json({ info: 'All fields are required' });
        }

        // Check if the NPO already has 5 campaigns
        const campaignCount = await campaignModel.countDocuments({ npo: npoId });
        if (campaignCount >= 20) {
            return res.status(403).json({ info: `You have reached the limit of 20 active campaigns` });
        }

        const user = await npoModel.findById(npoId);
        if (!user) {
            return res.status(404).json({ info: `User with id not found` });
        }

        let parsedEndDate = new Date(endDate);
        if (isNaN(parsedEndDate.getTime())) {
            return res.status(401).json({ info: `Invalid date format` });
        }

        let campaignPhotoUrl = null;
        if (req.file) {
            try {
                const uploadPhoto = await cloudinary.uploader.upload(req.file.path);
                campaignPhotoUrl = uploadPhoto.url;
            } catch (error) {
                return res.status(502).json({ info: error.message });
            }
        } else {
            return res.status(400).json({ message: `Photo is required` });
        }

        const lastDonationDate = new Date();

        // Validate that the end date is in the future
        if (parsedEndDate <= Date.now()) {
            return res.status(400).json({ info: `Oops, your end date should be in the future` });
        }

        // Validate that the end date is within 2 years from now
        if (parsedEndDate > twoYearsFromNow) {
            return res.status(400).json({ info: `End date cannot be more than 2 years from today` });
        }

        const newCampaign = new campaignModel({
            title,
            subtitle,
            story,
            Goal,
            ev,
            profilePic: campaignPhotoUrl,
            totalRaised: 0,
            todaysDonation: 0,
            monthlyDonation: 0,
            endDate: parsedEndDate,
            lastDonationDate,
            status: 'active',
            npo: npoId,
        });
        await npoModel.findByIdAndUpdate(npoId, {
            $push: { campaigns: newCampaign._id },
            $inc: { totalRaised: newCampaign.totalRaised }
          });

        const savedCampaign = await newCampaign.save();
        return res.status(201).json({ message: `Campaign created by ${user.organizationName}`, data: savedCampaign });
    } catch (error) {
        console.error('Error creating NPO campaign:', error);
        return res.status(500).json({ error: `An error occurred while creating the Npo campaign because ${error}` });
    }
};

// Usage example in your API response
exports.getSingleCampaign = async (req, res) => { 
    try {
        const { campaignId } = req.params;
        const campaign = await campaignModel.findById(campaignId).populate('npo', 'organizationName');

        if (!campaign) {
            return res.status(404).json({ info: 'Campaign not found' });
        }
        return res.status(200).json({
            campaign,
            //monthlyDonations,
        });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

// Controller function to update campaign
exports.updateNpoCampaign = async (req, res) => {
    try {
        const {story, subtitle } = req.body;
        const { campaignId } = req.params;
        const npoId = req.user.id; 

        // Find the campaign by ID
        const campaign = await campaignModel.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ info: `Campaign not found` });
        }

        const user = await npoModel.findById(npoId);
        if (!user) {
            return res.status(404).json({ info: `User not found` });
        }

        if (!campaign.npo || campaign.npo.toString() !== npoId) {
            return res.status(403).json({ info: `Unauthorized: You can only update your own campaign(s)` });
        }

        campaign.story = story || campaign.story; 
        campaign.subtitle = subtitle || campaign.subtitle;
        

        if (req.file && req.file.length > 0) { 
             
            const oldFilePath = path.join(__dirname, 'uploads', user.photos);
            if (fs.existsSync(oldFilePath)) {
                fs.unlinkSync(oldFilePath); 
            }

            updatedData.photos = req.files[0].filename; 
        }

        await campaign.save();

        return res.status(200).json({ message: `Campaign updated successfully by ${user.organizationName}`, campaign });
    } catch (error) {
        return res.status(500).json({ error: `Server error: ${error.message}` });
    }
};



exports.NpoManagement = async(req,res)=>{
    try {
        const {donorId} = req.params
        const {campaignId,message}=req.body

        const donor = await donationModel.findOne({_id:donorId,campaign:campaignId})
        if(!donor){
            return res.status(404).json({message:`donor not found`})
        }
        if(donor.campaign.toString()!==campaignId){
            return res.status(400).json({info:`hey,no recent donation has been made to your campaign,you can send to your old donors anyways`})
        }
        let Individualreceiver = donor.npo ?donor.npo:null
        let Nporeceiver = donor.individual ?donor.individual:null
 
        const Npomanagement = new messageModel({
            campaign:campaignId,
            donor:donorId,
            campaignCreator:campaign.npo,
            Nporeceiver:Nporeceiver,
            Individualreceiver:Individualreceiver,
            message
        })
        await Npomanagement.save()
        const donorEmail = donor.email
        await sendmail({
            email:donorEmail,
            subject:"message from the campaign you donated to",
            html:`<p>${message}</p>`
        })
        res.status(200).json({message:`campaign creator successully send message`})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:`can not send message because ${error}`})
    }
}

exports.getNpoCampaigns = async (req, res) => {
    try {
      const npoId = req.user.id; 
  
      // Find the NPO user
      const user = await npoModel.findById(npoId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      
      const allCampaigns = await campaignModel.find({ 'npo': npoId })
        .populate('npo', 'organizationName')
        .populate({ path: 'donations', select: 'amount createdAt' }) 
        .sort({ createdAt: -1 });
  
      if (allCampaigns.length < 1) {
        return res.status(400).json({ message: `Oops, dear ${user.organizationName}, you have not created any campaigns yet` });
      }
  
      
      const totalRaisedFromAllCampaigns = allCampaigns.reduce((total, campaign) => total + (campaign.totalRaised || 0), 0);
    //   console.log(typeof totalRaisedFromAllCampaigns)
      
      const campaignIds = allCampaigns.map(campaign => campaign._id);
      const donations = await donationModel.find({ campaign: { $in: campaignIds } });
  
      const getMonthlyDonations = (donations) => {
    
        const months = [
          { month: "Jan", amount: 0 },
          { month: "Feb", amount: 0 },
          { month: "Mar", amount: 0 },
          { month: "Apr", amount: 0 },
          { month: "May", amount: 0 },
          { month: "Jun", amount: 0 }, 
          { month: "Jul", amount: 0 },
          { month: "Aug", amount: 0 },
          { month: "Sep", amount: 0 },
          { month: "Oct", amount: 0 },
          { month: "Nov", amount: 0 },
          { month: "Dec", amount: 0 },
        ];
  
        
        donations.forEach(donation => {
          
          const donationMonth = new Date(donation.createdAt).toLocaleString('default', { month: 'short' });
  
          
          const monthIndex = months.findIndex(month => month.month === donationMonth);
          if (monthIndex !== -1) {
            months[monthIndex].amount += donation.amount;
          }
        });
   
        return months;
      };
  
      const monthlyDonations = getMonthlyDonations(donations);
  
      return res.status(200).json({
        message: `Here are all campaigns created by ${user.organizationName}`,
        allCampaigns,
        totalRaisedFromAllCampaigns: Number(totalRaisedFromAllCampaigns), 
        monthlyDonations
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  