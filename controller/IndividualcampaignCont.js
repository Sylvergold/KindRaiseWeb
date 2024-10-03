const campaignModel = require("../model/campaignModel")
const donationModel=require("../model/donationModel")
const individualModel = require("../model/individualModel")
const npoModel = require("../model/npoModel")
const cloudinary=require("../utilis/cloudinary")
const sendmail=require("../helpers/html")
exports.createCampaignByIndividual = async (req, res) => {
    try {
            console.log(req.user)
        const { title, subtitle, story, Goal,endDate  } = req.body;
        const individualId= req.user.id;

        if (!title || !subtitle || !story || !Goal ||!endDate) {  
            return res.status(400).json({ info: 'All fields are required' });
        }
        const user=await individualModel.findById(individualId)
         
        if(!user){
            return res.status(404).json({info:`user with id not found`})
        }
            let parsedEndDate=new Date(endDate) 
            if(isNaN(parsedEndDate.getTime())){
                return res.status(401).json({info:`invalid date format`})
            }
        let campaignPhotoUrl=null
          if(req.file){
               try{
                const uploadPhoto=await cloudinary.uploader.upload(req.file.path)
                campaignPhotoUrl=uploadPhoto.url             
               }catch(error){
                 res.status(502).json({info:error.message})
               }
          }else{
            res.status(400).json({message:`photo is required`})
          } 

          const lastDonationDate=new Date()

          const newCampaign = new campaignModel({
              title,
              subtitle,
              story,
              Goal, 
              profilePic:campaignPhotoUrl,
              totalRaised:0,
              monthlyDonation:0,
              endDate:parsedEndDate,
              lastDonationDate:lastDonationDate,
              status:'active',
              individual:individualId,
          });
           
        const savedCampaign = await newCampaign.save();
       
        return res.status(201).json({message:`campaign created by ${user.firstName}`,data:savedCampaign});
    } catch (error) {
        console.error('Error creating individual campaign:', error);
        return res.status(500).json({ error: `An error occurred while creating the individual campaign because ${error}` });
    }
};

exports.getCampaignById = async (req, res) => {
    try {
      const { campaignId } = req.params;
  
      const campaign = await campaignModel.findById(campaignId)
        .populate('individual')
        .populate('npo');
  
      if (!campaign) {
        return res.status(404).json({ error: "Campaign not found" });
      }
  
      // Add the lastDonationMonth to the campaign object
      const campaignWithDonationMonth = campaign.toObject();
      campaignWithDonationMonth.lastDonationMonth = campaign.lastDonationMonth;
  
      return res.status(200).json({
        campaign: campaignWithDonationMonth,
      });
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  };
  

exports.getAllIndividualCampaigns = async (req, res) => {
    try {
        const individualId = req.user.id; 
        
        const user = await individualModel.findById(individualId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allCampaigns = await campaignModel.find({ 'individual': individualId }).populate('individual','firstName lastName email' );
       
        if (allCampaigns.length < 1) {
            return res.status(400).json({ message: `Oops, dear ${user.lastName}, you have not created any campaigns yet` });
        }
        
        return res.status(200).json({ 
            message: `Here are all campaigns created by ${user.lastName}`, 
            campaigns: allCampaigns 
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.updateIndividualCampaign = async (req, res) => {
    try {
        const { story, subtitle } = req.body;
        const { campaignId } = req.params;
        const individualId = req.user.id; 

        // Find the campaign by ID
        const campaign = await campaignModel.findById(campaignId);
        if (!campaign) {
            return res.status(404).json({ info: `Campaign not found` });
        }

        const user = await individualModel.findById(individualId);
        if (!user) {
            return res.status(404).json({ info: `User not found` });
        }

        if (campaign.individual.toString() !== individualId) {
            return res.status(403).json({ info: `Unauthorized: You can only update your own campaign(s)` });
        }

        campaign.story = story || campaign.story; 
        campaign.subtitle = subtitle || campaign.subtitle;

        // Check if the user uploaded a new photo
        if (req.file) {
           
            const cloudinaryResult = await cloudinary.uploader.upload(req.file.path, {
                folder: 'campaigns', 
                width: 500, 
                crop: "scale"
            });
 
            campaign.profilePic = cloudinaryResult.secure_url;
        }

        await campaign.save();

        return res.status(200).json({ message: `Campaign updated successfully ${user.firstName}`, campaign });
    } catch (error) {
        return res.status(500).json({ error: `Server error: ${error.message}` });
    }
};


exports.deleteCampaign=async(req,res)=>{
    try {
        const allUsers = await individualModel.find()
        if (allUsers < 1) {
            return res.status(400).json({ info: `oops!,sorry no campaign found in database` })
        }
        const campaign=await campaignModel.deleteMany()
        
        return res.status(200).json({ message: `all ${allUsers.length}campaigns deleted successfully` });
    } catch (error) {
        return res.status(500).json({ error: `Server error: ${error.message}` });
    }
   
}