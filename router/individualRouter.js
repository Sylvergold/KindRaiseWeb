const express = require("express");
const router = express.Router();
const uploads = require("../utilis/multer.js")

const { signUp, logIn,updatedindividual,verifyEmail,resendVerificationEmail,forgetPassword,resetPassword, changePassword,logOut,getOne} = require("../controller/individualController"); 

const userValidator = require("../middleware/validator")
const{authenticate} = require("../middleware/auth");

//onboarding
router.post("/signup",uploads.single ('profilepics'),userValidator(true),signUp)  
router.post("/login",logIn) 
router.post("/logout",logOut,authenticate) 

//roles
 router.patch("/updateuser/:id",updatedindividual)
router.get("/getone/:id",getOne) 
 
//security
router.get("/verifyemail/:token",verifyEmail)  
router.post("/resendVerificationEmail",resendVerificationEmail)
router.post("/forgetPassword",forgetPassword)
router.get("/resetPassword/:token",resetPassword)
router.put("/changePassword/:token",userValidator(false,["oldPassword",'ConfirmNewPassword','NewPassword']),changePassword)

module.exports = router 
  