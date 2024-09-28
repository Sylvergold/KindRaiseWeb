const express = require("express");
const router = express.Router();
const uploads=require("../utilis/multer")

const { NposignUp,updateNpo,NpoverifyEmail,NporesendVerificationEmail,NpoforgetPassword,NporesetPassword, NpochangePassword,NpologOut,getOneNpo}=require("../controller/npoController")
const userValidator=require("../middleware/validator") 
const {createPayOut}=require("../controller/payoutController")

const{authenticate,authenticateAdmin}=require("../middleware/auth")
   //onboarding
router.post("/sign-up",uploads.single('profilepics'),userValidator(true),NposignUp)  
router.post("/log-out",NpologOut)
//roles
router.put("/update-user/:id",updateNpo)

router.get("/get-one/:id",getOneNpo)    
//security
router.get("/verify-email/:token",NpoverifyEmail)
router.post("/resend-VerificationEmail",NporesendVerificationEmail)
router.post("/forget-Password",NpoforgetPassword)
router.get("/reset-Password/:token",NporesetPassword)
router.put("/change-Password/:token",userValidator(false,["oldPassword",'ConfirmNewPassword','NewPassword']),NpochangePassword)
router.post("/payout",authenticate,createPayOut)
//exports 
module.exports=router 
 