const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SGAPI_KEY);

const sendEmail = async ({ to, subject, html, text }) => {
  const msg = {
    to,
    subject,
    html,
    text: text || "",
    from: process.env.MY_EMAIL,
  };

  try {
    await sgMail.send(msg);
    console.log("Email sent to:", to);
    return true;
  } catch (error) {
    console.error("SendGrid error:", error.response?.body || error.message);
    throw error;
  }
};

module.exports = sendEmail;
