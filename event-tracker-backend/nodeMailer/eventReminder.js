const nodemailer = require("nodemailer");
const dotenv = require("dotenv");
dotenv.config();

const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  secure: false,
  auth: {
    user: process.env.ETHEREAL_EMAIL,
    pass: process.env.ETHEREAL_PASSWORD,
  },
});

const sendTestEmail = async () => {
  try {
    const mailOptions = {
      from: '"Event Tracker" <no-reply@example.com>',
      to: "test@example.com",
      subject: "Test Email for Event Reminder",
      text: "This is a test email sent using Ethereal.",
    };

    const info = await transporter.sendMail(mailOptions);

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

sendTestEmail();
