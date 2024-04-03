const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: "support@taskorial.com",
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

module.exports.resetMail = (email, newToken) => {
  const mailData = {
    from: "support@taskorial.com",
    to: email,
    subject: "Taskorial Password Reset Code",
    text: "text field",
    html: `<p>Here is the code to reset your password: </p><p>${newToken}</p>`,
  };

  transporter.sendMail(mailData, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
