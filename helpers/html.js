const signUpTemplate = (verifyLink, organizationName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Welcome to KindRaise!</title>
      <style>
        body {
          font-family: "Sora", serif;
          line-height: 1.6;
          color: #333;
          background-color: #f9f9f9;
          margin: 0;
          padding: 20px;
        }
        .header {
          text-align: center;
          background-color: #4CAF50;
          color: #fff;
          padding: 15px;
          border-radius: 8px 8px 0 0;
          box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
        }
        .header h1 {
          margin: 0;
          font-size: 2rem;
          font-weight: 600;
        }
        .content {
          max-width: 600px;
          margin: 0 auto;
          background-color: #fff;
          padding: 20px;
          border-radius: 0 0 8px 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        h2 {
          color: #333;
          font-size: 1.5rem;
          margin-bottom: 10px;
        }
        p {
          font-size: 1rem;
          color: #555;
          margin-bottom: 20px;
        }
        .button {
          display: inline-block;
          padding: 12px 24px;
          background-color: #4CAF50;
          color: #fff;
          text-decoration: none;
          border-radius: 5px;
          font-size: 1rem;
          font-weight: bold;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #45a049;
        }
        .campaign-info {
          margin-top: 15px;
          font-size: 1rem;
          color: #666;
          padding: 10px;
          background-color: #f1f1f1;
          border-radius: 4px;
        }
        .footer {
          text-align: center;
          font-size: 0.9rem;
          color: #888;
          margin-top: 30px;
        }
        .footer nav ul {
          list-style: none;
          padding: 0;
        }
        .footer nav ul li {
          display: inline;
          margin: 0 10px;
        }
        .footer nav ul li a {
          color: #4CAF50;
          text-decoration: none;
          transition: color 0.3s ease;
        }
        .footer nav ul li a:hover {
          color: #333;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Welcome to KindRaise!</h1>
      </div>
      <div class="content">
        <h2>Hello, ${organizationName}!</h2>
        <p>Thank you for joining KindRaise. We're excited to have you on board and look forward to supporting your journey.</p>
        <p>To get started, please verify your account by clicking the button below:</p>
        <a href="${verifyLink}" class="button">Verify My Account</a>
        <div class="campaign-info">
          
          <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
        </div>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()} KindRaise, Inc. All rights reserved.</p>
        <nav>
          <ul>
            <li><a href="#">Terms</a></li>
            <li><a href="#">Privacy</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </div>
    </body>
    </html>
  `;
};


const verifyTemplate = (verifyLink, fullName) => {
    return `
    <!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>HURRAY!!! congratulation,welcome to THE CURVE TO-DO APP</title>
    <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f7f7f7;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 10px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
      background-color: #fff;
    }
    .header {
      background: #007bff;
      padding: 10px;
      text-align: center;
      border-bottom: 1px solid #ddd;
      color: #fff;
    }
    .content {
      padding: 20px;
      color: #333;
    }
    .footer {
      background: #333;
      padding: 10px;
      text-align: center;
      border-top: 1px solid #ddd;
      font-size: 0.9em;
      color: #ccc;
    }
    .button {
      display: inline-block;
      background-color: #ff9900;
      color: #fff;
      padding: 10px 20px;
      text-decoration: none;
      border-radius: 5px;
    }
    </style>
    </head>
  <body>
    <div class="container">
      <div class="header">
        <h1>Verify Your Account</h1> 
      </div>
      <div class="content">
        <p>Hello ${fullName},</p>
        <p>We're excited to have you on board! Please click the button below to verify your account:</p>
        <p>
          <a href="${verifyLink}" class="button">Verify My Account</a>
        </p>
        <p>If you did not create an account, please ignore this email.</p>
        <p>Best of luck,<br>Isah's co-operation</p>
      </div>
      <div class="footer">
        <p>&copy; ${new Date().getFullYear()}  Isah Abdulwahab Enterprise.. All rights reserved.</p>
      </div>
    </div>
  </body>
  </html>
`;
};
const forgotPasswordTemplate = (resetLink, firstName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
      body {
          font-family: Arial, sans-serif;
          line-height: 1.6;
          color: #333;
          background-color: #f7f7f7;
          margin: 0;
          padding: 0;
        }
        .container {
          max-width: 600px;
          margin: 40px auto;
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(0,0,0,0.1);
          background-color: #fff;
        }
        .header {
          background: #007bff;
          padding: 10px;
          text-align: center; 
          border-bottom: 1px solid #ddd;
          color: #fff;
        }
        .content {
          padding: 20px;
          color: #333;
        }
        .footer {
          background: #333;
          padding: 10px;
          text-align: center;
          border-top: 1px solid #ddd;
          font-size: 0.9em;
          color: #ccc;
        }
        .button {
          display: inline-block;
          background-color: #ff9900;
          color: #fff;
          padding: 10px 20px;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Reset Your Password</h1>
        </div>
        <div class="content">
          <p>Hello ${firstName},</p>
          <p>We received a request to reset your password. If you didn't make this request, please ignore this email.</p>
          <p>Click the button below to reset your password:</p>
          <p>
            <a href="${resetLink}" class="button">Reset Password</a>
          </p>
          <p>Best regards,<br> kind raise Team</p>
        </div>
        <div class="footer">
          <p>&copy; ${new Date().getFullYear()}  kindRaise co-operation. All rights reserved.</p>
        </div>
      </div>
    </body> 
    </html>
  `;
};

const donationTemplate = (name, amount, campaignTitle, date, donationLink) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Thank You for Your Donation</title>
    <style>
        body {
            font-family: 'Sora', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 30px auto;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .header {
            background-color: #007bff;
            color: #fff;
            text-align: center;
            padding: 25px;
            border-radius: 10px 10px 0 0;
        }
       .header {
            background-color: #28a745;
            color: #fff;
            text-align: center;
            padding: 25px;
            border-radius: 10px 10px 0 0;
        }
        .content {
            padding: 30px 20px;
            color: #333;
            line-height: 1.8;
        }
        .content p {
            margin: 15px 0;
            font-size: 16px;
        }
        .details {
            background-color: #f1f1f1;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
        }
        .details p {
            margin: 10px 0;
            font-size: 16px;
            font-weight: bold;
        }
       .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
            border-radius: 0 0 10px 10px;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #0056b3;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
           <h1>Thank You for Your Donation! <span class="heart-icon">❤️</span></h1>
        </div>
        <div class="content">
            <p>Dear ${name},</p>
            <p>We are incredibly grateful for your generous donation of ₦${amount} to the <strong>${campaignTitle}</strong> campaign. Your support helps us make a meaningful impact.</p>
            <div class="details">
                <p><strong>Donation Details:</strong></p>
                <p>Donation Amount: ₦${amount}</p>
                <p>Campaign: ${campaignTitle}</p>
                <p>Date: ${date}</p>
            </div>
            <p>We will keep you updated on how your contribution is making a difference. You can view the progress of the campaign below:</p>
          
        </div>
        <div class="footer">
            <p>&copy; 2024 KindRaise, Inc. All rights reserved. | [Organization Address: 132 muyibi street,olodi,apapa,Lagos.] | [Contact us contact.kindraise@gmail.com ]</p>
        </div>
    </div>
</body>
</html>
  `;
};
const campaignCreatorTemplate = (campaignTitle, campaignLink = '') => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Donation Alert</title>
    <style>
        body {
            font-family: 'Sora', sans-serif;
            background-color: #f7f7f7;
            margin: 0;
            padding: 0;
        }
        .container {
            background-color: #ffffff;
            max-width: 600px;
            margin: 30px auto;
            border-radius: 10px;
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .header {
            background-color: #28a745;
            color: #fff;
            text-align: center;
            padding: 25px;
            border-radius: 10px 10px 0 0;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
        }
        .content {
            padding: 30px 20px;
            color: #333;
            line-height: 1.8;
        }
        .content p {
            margin: 15px 0;
            font-size: 16px;
        }
        .footer {
            background-color: #f1f1f1;
            text-align: center;
            padding: 20px;
            font-size: 14px;
            color: #777;
            border-radius: 0 0 10px 10px;
        }
        .button {
            display: inline-block;
            padding: 12px 30px;
            background-color: #28a745;
            color: white;
            text-decoration: none;
            font-size: 16px;
            border-radius: 5px;
            transition: background-color 0.3s ease;
        }
        .button:hover {
            background-color: #218838;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>New Donation Alert! <span class="heart-icon">❤️</span></h1>
        </div>
        <div class="content">
            <p>Dear Campaign Owner,</p>
            <p>We're excited to inform you that a donor has contributed to your campaign titled: <strong>${campaignTitle}</strong>!</p>
            <p>You're doing amazing work, and this donation is a testament to the impact you're making. Keep up the fantastic effort!</p>
           
            <p>Stay inspired and continue to drive change!</p>
        </div>
        <div class="footer">
           <p>&copy; 2024 KindRaise, Inc. All rights reserved. | [Organization Address: 132 muyibi street,olodi,apapa,Lagos.] | [Contact us contact.kindraise@gmail.com ]</p>
        </div>
    </div>
</body>
</html>
  `;
};


module.exports = { signUpTemplate,verifyTemplate,forgotPasswordTemplate,donationTemplate,campaignCreatorTemplate};
