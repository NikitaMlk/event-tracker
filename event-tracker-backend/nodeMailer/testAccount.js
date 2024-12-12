const nodemailer = require("nodemailer");

(async () => {
  const testAccount = await nodemailer.createTestAccount();
  console.log("Ethereal test account created:", testAccount);

  process.env.ETHEREAL_EMAIL = testAccount.user;
  process.env.ETHEREAL_PASSWORD = testAccount.pass;

  console.log(`ETHEREAL_EMAIL=${testAccount.user}`);
  console.log(`ETHEREAL_PASSWORD=${testAccount.pass}`);
})();
