const express=require("express")
const router=express.Router()
const{ createDonation,getAllDonation,getDonationById,NpoManagement,trackDonationHistory}=require("../controller/donationController")
const { authenticate } = require("../middleware/auth")

router.post("/donate/:campaignId",createDonation)
router.get("/getAllDonation/:campaignId",authenticate,getAllDonation)
router.get("/getDonationById/:donationId",authenticate,getDonationById)
router.post("/send-message/:donorId",authenticate,NpoManagement)
router.get("/history",authenticate,trackDonationHistory)
router.get("/history",authenticate,trackDonationHistory)
module.exports=router
