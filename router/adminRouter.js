const express = require("express")
const adminrouter = express.Router()

const{authenticate,authenticateAdmin}=require("../middleware/auth");

const { deleteByAdmin,makeAdmin,deleteAllIndividual,getAllIndividual,getAllNpo,deleteOneNpo,makeCampaignActive,makeCampaignInactive,getAllCampaign,deleteCampaignById,deleteall,deleteallD,deleteallC,deleteAllCampaign } = require("../controller/adminController.js");

////ADMIN MANAGEMENT///////
adminrouter.delete("/deleteoneIndividual/:id",authenticate,authenticateAdmin,deleteByAdmin)
adminrouter.put('/makeadmin/:id',authenticate,authenticateAdmin,makeAdmin)
adminrouter.delete("/deleteAllIndividual",authenticate,authenticateAdmin,deleteAllIndividual) 
adminrouter.get("/get-allindividual",authenticate,authenticateAdmin,getAllIndividual) 
adminrouter.get("/getall-Npo",authenticate,authenticateAdmin,getAllNpo)  
adminrouter.delete("/delete-Npo/:id",authenticate,authenticateAdmin,deleteOneNpo)
adminrouter.patch("/active/:campaignId",authenticate,authenticateAdmin,makeCampaignActive)
adminrouter.patch("/inactive/:campaignId",authenticate,authenticateAdmin,makeCampaignInactive)
adminrouter.get("/getallcampaigns",getAllCampaign)
adminrouter.delete("/deleteOneCampaign/:campaignId",authenticate,authenticateAdmin,deleteCampaignById)
adminrouter.delete("/delete-every",authenticate,authenticateAdmin,deleteall)
adminrouter.delete("/delete-everyd",authenticate,authenticateAdmin,deleteallD) 
adminrouter.delete("/delete-everyc",authenticate,authenticateAdmin,deleteallC) 
adminrouter.delete("/delete-campaignsLimit",deleteAllCampaign) 

module.exports = adminrouter 