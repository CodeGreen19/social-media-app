const nodeMailer = require("nodemailer");

// send  a fake main on mailtrapper
exports.sendEmail = async (options) => {
  const transporter = nodeMailer.createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "ed7c7306bf3ad4",
      pass: "cf76d9d0c3311f",
    },
  });

  const mailOptions = {
    from: "ed7c7306bf3ad4",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  await transporter.sendMail(mailOptions);
};
