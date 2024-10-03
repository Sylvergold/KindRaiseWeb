const npoModel = require("../model/npoModel")
const individualModel = require("../model/individualModel")
const campaignModel=require("../model/campaignModel")
const donationModel=require("../model/donationModel")
const jwt=require("jsonwebtoken")
require("dotenv").config()
const fs=require("fs")
exports.deleteallD = async (req, res) => {
    try {
        
        const deletedDonation= await donationModel.deleteMany();



        const totalDeleted = deletedDonation.deletedCount
        if (totalDeleted === 0) {
            return res.status(200).json({ message: `No users found in the database` });
        }
        res.status(200).json({
            message:`${totalDeleted} users deleted successfully`,
            deletedDonation:deletedDonation.deletedCount
            
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteallC = async (req, res) => {
    try {
        
        const campaigns= await campaignModel.deleteMany();

        const totalDeleted = campaigns.deletedCount
        if (totalDeleted === 0) {
            return res.status(200).json({ message: `No campaigns found in the database` });
        }
        res.status(200).json({
            message:`${totalDeleted} campaigns deleted successfully`,
            campaigns:campaigns.deletedCount
            
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//admin deleting single user 
exports.deleteall = async (req, res) => {
    try {
        
        const deletedIndividuals = await individualModel.deleteMany();

        
        const deletedNpos = await npoModel.deleteMany();

    
        const totalDeleted = deletedIndividuals.deletedCount + deletedNpos.deletedCount;
        if (totalDeleted === 0) {
            return res.status(200).json({ message: `No users found in the database` });
        }

        
        res.status(200).json({
            message: `${totalDeleted} users deleted successfully`,
            deletedIndividuals: deletedIndividuals.deletedCount,
            deletedNpos: deletedNpos.deletedCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    } 
};

exports.deleteByAdmin = async (req, res) => {
    try {
        const { id } = req.params 
        let userInfo
        userInfo = await individualModel.findByIdAndDelete(id)
        if (!userInfo) {
            userInfo = await npoModel.findByIdAndDelete(id)
        }
        if (!userInfo) {
            return res.status(404).json({ message: `,oops!!,neither npo and individual details are found ` })
        }

        if (req.files && req.files.length > 0 && userInfo.profilePic) {
            const oldFilePath = `uploads.${userInfo.profilePic}`
            if (fs.existsSinc(oldFilePath)) {
                fs.unlinkSinc(oldFilePath)
            }
        }
        
      
        return res.status(200).json({ info: `delete successful`,name:userInfo.firstName })
    } catch (error) {
        res.status(500).json({ info: `${error.message}` })
    }
}
exports.deleteAllIndividual = async (req, res) => {
    try {
        const allUsers = await individualModel.find()
        if (allUsers < 1) {
            return res.status(400).json({ info: `oops!,sorry no user found in database` })
        }
        const deleteAllUser = await individualModel.deleteMany({})
        return res.status(200).json({ info: `all ${allUsers.length} users in database deleted successfully` })
    } catch (error) {
        return res.status(500).json({
            message: `can not delete all user because ${error}`
        })
    }
}

exports.deleteOneNpo=async(req,res)=>{
    try {
        const {id}=req.params
        
        if(req.files&&req.files.length>0){
            const oldFilePath=`uploads.${user.photos}`
            if(fs.existsSinc(oldFilePath)){
                fs.unlinkSinc(oldFilePath)
            }
        }
        const userInfo=await npoModel.findByIdAndDelete(id)
        return res.status(200).json({info:`delete successful`,})
    } catch (error) {
        res.status(500).json({info:`${error.message}`})
    }
}

exports.getOne = async (req, res) => {
    try {
        const { id } = req.params
        let userInfo
        userInfo = await individualModel.findById(id)
        if (!userInfo) {
            userInfo = await npoModel.findById(id)
        }
        if (!userInfo) {
            return res.status(404).json({ message: `,oops!!,neither npo and individual details are found ` })
        }

        res.status(200).json({ message: `${userInfo.firstName} details collected successfully`, userInfo })
    } catch (error) {
        return res.status(500).json({ info: `unable to find user because ${error} ` })
    }
}

//deleting all user
exports.deleteAllIndividual = async (req, res) => {
    try {
        const allUsers = await individualModel.find()
        if (allUsers < 1) {
            return res.status(400).json({ info: `oops!,sorry no user found in database` })
        }
        const deleteAllUser = await individualModel.deleteMany({})
        return res.status(200).json({ info: `all ${allUsers.length} users in database deleted successfully` })
    } catch (error) {
        return res.status(500).json({
            message: `can not delete all user because ${error}`
        })
    }
}
exports.deleteAllNpo = async (req, res) => {
    try {
        const allUsers = await npoModel.find()
        if (allUsers < 1) {
            return res.status(400).json({ info: `oops!,sorry no user found in database` })
        }
        const deleteAllUser = await npoModel.deleteMany({})
        return res.status(200).json({ info: `all ${allUsers.length} users in database deleted successfully` })
    } catch (error) {
        return res.status(500).json({
            message: `can not delete all user because ${error}`
        })
    }
}

//fetching all users including npo and individual
exports.getAllIndividual = async (req, res) => {
    try {
        const allUsers = await individualModel.find();
        if (allUsers <= 0) {
            return res.status(400).json({ info: `oops !! no user found in database` })
        }

        const everyUsers = allUsers.map(user => {

            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1 hour" });


            return {
                ...user.toObject(),
                token,
                isAdmin: user.role === 'admin' ? true : false
            };
        });

        return res.status(200).json({
            info: `All ${allUsers.length} users in the database collected successfully`,
            users: everyUsers
        });
    } catch (error) {
        return res.status(500).json({
            message: `Cannot get all users because ${error}`
        });
    }
};




exports.getAllNpo = async (req, res) => {
    try {
        const allUsers = await npoModel.find();
        if(allUsers<=0){
            return res.status(400).json({info:`oops !! no user found in database`})
        }

       
        const everyUsers= allUsers.map(user=>{
            const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, { expiresIn: "1 hour" });
            return {
                ...user.toObject(),
                token
            }
        })

        return res.status(200).json({
            info: `All ${allUsers.length} users in the database collected successfully`,
            users: everyUsers
        });
    } catch (error) {
        return res.status(500).json({
            message: `Cannot get all users because ${error}`
        });
    }
};




//able to make others an admin
//able to make others an admin
exports.makeAdmin = async (req, res) => {
    try {
        const { id } = req.params;

        let userInfo = await individualModel.findById(id);
        if (!userInfo) {
            userInfo = await npoModel.findById(id);
        }
        if (!userInfo) {
            return res.status(404).json({ message: 'User not found' });
        }

        userInfo.isAdmin = true;
        userInfo.role = 'admin';

        await userInfo.save();

        res.status(200).json({ 
            info: `Congratulations ${userInfo.firstName}, you are now an admin`, 
            userInfo 
        });
    } catch (error) {
        res.status(500).json({ message: `Unable to make admin because: ${error.message}` });
    }
};

//getting single individuals

//get one particular admin by its id
exports.getCampaignById = async (req, res) => {
    try {
        const { campaignId } = req.params;
        const individualId = req.user.id
        const campaign = await campaignModel
            .findById(campaignId)
            .populate('individual', 'firstName lastName email');

        if (!campaign) {
            console.log(campaign)
            return res.status(404).json({ message: 'Campaign not found' });
        }
        if (campaign.individual._id.toString() !== individualId) {
            return res.status(403).json({ info: `oops you can only view the campaigns you created` })
        }

        res.status(200).json({ campaign });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

//get all campaign
exports.getAllIndividualCampaigns = async (req, res) => {
    try {
        const individualId = req.user.id;

        const user = await individualModel.findById(individualId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const allCampaigns = await campaignModel.find({ 'individual': individualId }).populate('individual', 'firstName lastName email');

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

// Get a single donation by ID
exports.AdmingetDonationById = async (req, res) => {
    try {
        const { donationId } = req.params
        const individualId = req.user
        if (!mongoose.Types.ObjectId.isValid(donationId)) {
            return res.status(400).json({ error: "Invalid donation ID format." });
        }

        const donation = await donationModel.findById(donationId).populate('campaign');
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        if (donation.campaign.individual.toString() !== individualId) {
            return res.status(403).json({ message: `oops, sorry you can only view donations made to the campaign you created` })
        }
        const campaignTitle = donation.campaign ? donation.campaign.title : "unknown campaign"
        return res.status(200).json({ message: `below are  donation donated to ${campaignTitle}`, donation });
    } catch (error) {
        return res.status(500).json({ error: `Failed to fetch donation${error}` });
    }
};

// Update a donation
exports.getAllDonationByAdmin = async (req, res) => {
    try {
        const { campaignId } = req.params
        const individualId = req.user
        const campaign = await campaignModel.findById(campaignId)

        //check if there is a campaign
        if (!campaign) {
            return res.status(404).json({
                error: "campaign not found"
            })
        }
        const donations = await donationModel.find({ campaign: campaignId }).populate("campaign", "title,")
            .populate("individual", "firstName");
        if (!donations || donations.length === 0) {
            return res.status(404).json({ error: "donations not found in this campaign" });
        }
        if (campaign.individual.toString() !== individualId) {
            return res.status(403).json({ message: `oops, sorry you can only view donations made to the campaign you created` })
        }
        return res.status(200).json({ message: `below are ${donations.length} donations donated to ${campaign.title}`, donations });
    } catch (error) {
        return res.status(500).json({ error: `Failed to update donation because ${error}` });
    }
};


// Delete a donation
exports.deleteDonationByAdmin = async (req, res) => {
    try {
        const {donationId}=req.params

        const donation = await donationModel.findByIdAndDelete(donationId);
        if (!donation) {
            return res.status(404).json({ error: "Donation not found" });
        }
        return res.status(200).json({ message: "Donation deleted successfully" });
    } catch (error) {
        return res.status(500).json({ error: "Failed to delete donation" });
    }
};
 

exports.makeCampaignInactive=async(req,res)=>{
    try {
        const {campaignId}=req.params
        const campaign=await campaignModel.findById(campaignId)
        if(!campaign){
            return res.status(404).json({message:`confirm id and try again user not found`})
        }
             campaign.status="inactive"
             await campaign.save()
          res.status(200).json({message:`campaign deactivated successfully`})
    } catch (error) {
        res.status(500).json({info:`unable to make campaign inactive because ${error}`})
    }
}
exports.makeCampaignActive=async(req,res)=>{
    try {
        const {campaignId}=req.params
        const campaign=await campaignModel.findById(campaignId)
        if(!campaign){
            return res.status(404).json({message:`confirm id and try again user not found`})
        }
             campaign.status="active"
             await campaign.save()
          res.status(200).json({message:`campaign activated successfully`})
    } catch (error) {
        res.status(500).json({info:`unable to make campaign inactive because ${error}`})
    }
}


exports.getAllCampaign = async (req, res) => {
    try {
        // Fetch all campaigns with their related donations, NPO, and individual info
        const allCampaigns = await campaignModel.find()
            .populate({
                path: 'donations',
                select: 'amount name createdAt',
            })
            .populate('npo', 'organizationName')  // Populate NPO information
            .populate('individual', 'firstName')  // Populate individual information
            .sort({ createdAt: -1 });

        if (allCampaigns.length < 1) {
            return res.status(400).json({ message: `Oops, no campaign found` });
        }

        // Format the createdAt date for donations in all campaigns
        const formattedCampaigns = allCampaigns.map(campaign => {
            const formattedDonations = campaign.donations.map(donation => ({
                ...donation._doc,  // Spread other fields from donation
                donationDate: new Date(donation.createdAt).toLocaleDateString('en-US') // Format date
            }));

            return {
                ...campaign._doc,
                donations: formattedDonations // Replace with formatted donations
            };
        });

        // Function to sum donations by month
        const getMonthlyDonations = (donations) => {
            const months = {
                "January": 0,
                "February": 0,
                "March": 0,
                "April": 0,
                "May": 0,
                "June": 0,
                "July": 0,
                "August": 0,
                "September": 0,
                "October": 0,
                "November": 0,
                "December": 0,
            };

            // Sum donations by the month they were created
            donations.forEach(donation => {
                const donationMonth = new Date(donation.createdAt).toLocaleString('default', { month: 'long' });
                months[donationMonth] += donation.amount;  
            });

            return months;
        };

        // Flatten donations from all campaigns for monthly donations summary
        const donations = formattedCampaigns.flatMap(campaign => campaign.donations);
        const monthlyDonations = getMonthlyDonations(donations);

        return res.status(200).json({
            message: `Here are all campaigns `,
            campaigns: formattedCampaigns,
            monthlyDonations
        });

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

exports.deleteAllCampaign=async(req,res)=>{
    try{
        const campaigns=await donationModel.find().limit(10)
        if(campaigns <1){
            return res.status(400).json({
                message:`no campaign created yet`
            })
        }
        await donationModel.deleteMany({_id:{$in:campaigns.map((campaign)=>campaign._id)},})
        res.status(200).json({message:` ${campaigns.length} donation deleted succesfully in your dashboard`,campaigns})

    }catch(error){
res.status(500).json({info:error.message})
    }
}
exports.deleteCampaignById=async(req,res)=>{
    try {
        const {campaignId}= req.params
        const campaign=await campaignModel.findById(campaignId)
        if(!campaign){
            return res.status(404).json({message:`campaign with id not found`})
        }
        
        return res.status(200).json({message:`campaign deleted successfully`,campaign})
          
    } catch (error) {
        
        return res.status(404).json({error:error.message})
    }
}
