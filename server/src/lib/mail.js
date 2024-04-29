const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: "vedant.singhania@gmail.com",
    pass: process.env.SMTP_APP_PASSWORD,
  },
});

module.exports.resetMail = (email, newToken) => {
  const mailData = {
    from: "vedant.singhania@gmail.com",
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
