const sendmail=require("../helpers/nodemailer")
const campaignModel=require("../model/campaignModel")
const npoModel=require("../model/npoModel")
const payOutSchemaModel=require("../model/payOutModel") 
require("dotenv").config()
  
exports.createPayOut = async (req, res) => {
    try {
        const { amount, BankName, accountNumber, beneficiaryName } = req.body;
        const npoId = req.user._id; 

        const accountNumStr = String(accountNumber);
        if (accountNumStr.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Account number must be exactly 10 digits",
            });
        }

        const campaigns = await campaignModel.find({ 
            $or: [{ npo: npoId }, { individual: npoId }] 
        });

        if (campaigns.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No campaigns found for this user.",
            });
        }

        // Fetch the NPO's email
        const npo = await npoModel.findById(npoId).select("email");
        if (!npo) {
            return res.status(404).json({
                success: false,
                message: "NPO not found.",
            });
        }

        const beneficiary = beneficiaryName || "N/A";

        // Create a new payout
        const newPayOut = new payOutSchemaModel({
            donation: amount,
            BankName,
            accountNumber,
            beneficiaryName: beneficiary,
            npo: npoId,
            campaign: campaigns.map(c => c._id),
        });

        await newPayOut.save();

        // Prepare email content
        const emailHtml = `
            <p>Hello,</p>
            <p>A new payout request has been created:</p>
            <ul>
                <li><strong>NPO Email:</strong> ${npo.email}</li>
                <li><strong>Amount:</strong> ${amount}</li>
                <li><strong>Bank Name:</strong> ${BankName}</li>
                <li><strong>Account Number:</strong> ${accountNumber}</li>
                <li><strong>Beneficiary Name:</strong> ${beneficiary}</li>
                <li><strong>Campaign IDs:</strong> ${campaigns.map(c => c._id).join(", ")}</li>
            </ul>
            <p>Thank you!</p>
        `;

        // Send email
        await sendmail({
            email: process.env.MAIL_ID, // Sender email address
            subject: 'WITHDRAWAL ALERT !!',
            html: emailHtml, // Use the dynamically generated HTML
        });

        return res.status(201).json({
            success: true,
            message: "Payout created successfully",
            payout: newPayOut,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create payout",
            error: error.message,
        });
    }
};


exports.createPayOuts = async (req, res) => {
    try {
        const { amount, BankName, accountNumber, beneficiaryName } = req.body;
        const npoId = req.user._id; 

        const accountNumStr = String(accountNumber);
        if (accountNumStr.length !== 10) {
            return res.status(400).json({
                success: false,
                message: "Account number must be exactly 10 digits",
            });
        }

        
        const campaigns = await campaignModel.find({ 
            $or: [{ npo: npoId }, { individual: npoId }] 
        });

        if (campaigns.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No campaigns found for this user.",
            });
        }

        const beneficiary = beneficiaryName || "N/A";

        // Create a new payout
        const newPayOut = new payOutSchemaModel({
            donation: amount,
            BankName,
            accountNumber,
            beneficiaryName: beneficiary,
            npo: npoId,
            campaign: campaigns.map(c => c._id),
        });

        await newPayOut.save();
        const emailHtml = `
        <p>Hello,</p>
        <p>A new payout request has been created:</p>
        <ul>
            
            <li><strong>Amount:</strong> ${amount}</li>
            <li><strong>Bank Name:</strong> ${BankName}</li>
            <li><strong>Account Number:</strong> ${accountNumber}</li>
            <li><strong>Beneficiary Name:</strong> ${beneficiary}</li>
            <li><strong>Campaign IDs:</strong> ${campaigns.map(c => c._id).join(", ")}</li>
        </ul>
        <p>Thank you!</p>
    `;
        await sendmail({
            email: process.env.MAIL_ID,
            subject: 'WITHDRAWAL ALERT !!',
            html: emailHtml,
          });
      

        return res.status(201).json({
            success: true,
            message: "Payout created successfully",
            payout: newPayOut,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to create payout",
            error: error.message,
        });
    }
};



