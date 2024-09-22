const signUpTemplate = (verifyLink, organizationName) => {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Hurray! You've successfully signed-up</title>
<style>
  body {
    height: 100vh;
    background-color: rgb(255, 255, 255);
    display: flex;
    justify-content: center;
    align-items: center;
    font-family: Arial, sans-serif;
    color: #333;
    margin: 0;
    padding: 0;
  }

  .emailWrapper {
    width: 100%;
    max-width: 600px;
    background-color: rgb(255, 255, 255);
    box-shadow: 0 0 20px rgb(228, 220, 220);
    border-radius: 20px;
    min-width: 350px;
    padding: 20px;
  }

  .templateHeader {
    background-color: #E6FAF2;
    border-radius: 20px 20px 0 0;
    width: 100%;
    padding: 15px;
    text-align: center;
  }

  .templateBody {
    padding: 20px;
    border-bottom: 1px solid lightgray;
  }
  
  .bodyTitle {
    font-size: 20px;
    font-weight: bold;
  }

  .btnBox {
    text-align: center;
    margin-top: 20px;
  }

  .btnBox a {
    background-color: #448AFF;
    color: white;
    padding: 10px 20px;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    text-decoration: none;
  }

  .templateFooter {
    text-align: center;
    margin-top: 20px;
    font-size: 0.9em;
    color: #777;
  }

  .templateFooter ul {
    display: flex;
    justify-content: center;
    gap: 10px;
    list-style-type: none;
    padding: 0;
    margin: 20px 0 0;
    font-weight: bold;
  }

  .templateFooter li {
    cursor: pointer;
  }
  
  a {
    color: #448AFF;
  }

</style>
</head>
<body>
<div class="emailWrapper">
  <div class="templateHeader">
    <h1>KindRaise serves you best!</h1>
  </div>
  <div class="templateBody">
    <h2 class="bodyTitle">Congratulations ${organizationName},</h2>
    <p>Thank you for joining our community! We're happy to have you with us.</p>
    <p>Please click the button below to verify your account:</p>
    <div class="btnBox">
      <a href="${verifyLink}">Verify My Account</a>
    </div>
   
    <p>If you did not create an account, please, kindly ignore this email.</p>
  </div>
  <div class="templateFooter">
    <p>Best of luck,<br>KindRaise team</p>
    <p>&copy; ${new Date().getFullYear()} KindRaise, Inc. All rights reserved.</p>
    <ul>
      <li>Terms</li>
      <li>Privacy</li>
      <li>Contact</li>
    </ul>
  </div>
</div>
</body>
</html>`
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
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: left;
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .details {
            background-color: #f9f9f9;
            padding: 15px;
            margin: 20px 0;
            border-radius: 8px;
        }
        .details p {
            margin: 5px 0;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Thank You for Your Donation!</h1>
        </div>
        <div class="content">
            <p>Dear <strong>${name}</strong>,</p>
            <p>We sincerely appreciate your generous donation of ₦${amount} to the <strong>${campaignTitle}</strong> campaign. Your contribution will help us make a real difference.</p>
            <div class="details">
                <p><strong>Donation Details:</strong></p>
                <p>Donation Amount: ₦${amount}</p>
                <p>Campaign: ${campaignTitle}</p>
                <p>Date: ${date}</p>
            </div>
            <p>We will keep you updated on the progress of the campaign and how your donation is helping us reach our goals.</p>
            <a href="${donationLink}" class="button">View Campaign</a>
        </div>
        <div class="footer">
            <p>&copy; 2024 [Your Organization] | [Organization Address] | [Contact Information]</p>
        </div>
    </div>
</body>
</html>
  `;
};

const campaignCreatorTemplate = (campaignLink = '',name) => {
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
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            padding: 20px;
            background-color: #ffffff;
            max-width: 600px;
            margin: 0 auto;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
        .header {
            background-color: #007bff;
            color: white;
            text-align: center;
            padding: 20px;
            border-radius: 8px 8px 0 0;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: left;
            color: #333;
        }
        .content p {
            line-height: 1.6;
        }
        .footer {
            text-align: center;
            padding: 20px;
            font-size: 12px;
            color: #777;
        }
        .button {
            display: inline-block;
            padding: 10px 20px;
            background-color: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 5px;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Donation Alert</h1>
        </div>
        <div class="content">
            <p>Dear Campaign Creator ${name},</p>
            <p>We are pleased to notify you that someone has successfully donated to your campaign.</p>
            <p>You can view the details of your campaign <a href="${campaignLink}" class="button">here</a>.</p>
            <p>Thank you for your efforts!</p>
        </div>
        <div class="footer">
            <p>&copy; 2024 [Your Organization] | [Organization Address] | [Contact Information]</p>
        </div>
    </div>
</body>
</html>
  `;
};


module.exports = { signUpTemplate,verifyTemplate,forgotPasswordTemplate,donationTemplate,campaignCreatorTemplate};
