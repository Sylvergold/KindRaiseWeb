const nodemailer=require("nodemailer")
require("dotenv").config()

const sendmail=async (options)=>{
    const transporter=await nodemailer.createTransport({
        secure:true,
        service:process.env.SERVICE,
        auth:{
        user:process.env.MAIL_ID,
        pass:process.env.MAIL_PASSWORD   
        } 
      
    })

    let mailOptions={
        from:process.env.MAIL_ID,
        to:options.email,
        subject:options.subject,
        html:options.html
    }
    await transporter.sendMail(mailOptions)
}

module.exports=sendmail

