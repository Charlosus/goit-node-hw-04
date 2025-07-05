// const sgMail = require("@sendgrid/mail");
require("dotenv").config();
// sgMail.setApiKey(process.env.API_KEY);

// const msg = {
//   from: "sledz.karol.93@gmail.com",
//   to: "night.falcon.93@gmail.com",
//   subject: "Test",
//   text: "Text Content",
// };

// sgMail
//   .send(msg)
//   .then((info) => console.log(info))
//   .catch((err) => console.log(err));

// using Twilio SendGrid's v3 Node.js Library
// https://github.com/sendgrid/sendgrid-nodejs
// javascript

// sgMail.setDataResidency('eu');
const sgMail = require("@sendgrid/mail");

sgMail.setApiKey(process.env.API_KEY);
// sgMail.setDataResidency('eu');
// uncomment the above line if you are sending mail using a regional EU subuser

const verificationEmail = {
  to: "sledz.karol.93@gmail.com", // Change to your recipient
  from: "night.falcon.93@gmail.com", // Change to your verified sender
  subject: "Sending with SendGrid is Fun",
  text: "and easy to do anywhere, even with Node.js",
  html: "<strong>and easy to do anywhere, even with Node.js</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
