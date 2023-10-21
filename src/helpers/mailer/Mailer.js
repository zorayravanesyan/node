const Html = require("./Html");
const transporter = require("./nodemailerConfig");
console.log(process.env.DB_USERNAME);

const Mailer = {
  async sendVerificationMail(user) {
    let html = Html.sendVerificationMail(user);
    // const mailOptions = {
    //   from: process.env.GLOBAL_MAIL,
    //   to: user.email,
    //   subject: "Account verification",
    //   html: html,
    // };

    const mailOptions = {
      from: "ttesttest942@gmail.com",
      to: user.email,
      subject: "Account verification",
      html: html,
    };

    await transporter.sendMail(mailOptions);
  },

  async registrationForAdmin(user) {
    let html = Html.registrationForAdmin(user);
    const mailOptions = {
      // from: process.env.GLOBAL_MAIL,
      // to: process.env.ADMIN_MAIL,  // admin mail
      // subject: "Account registrated",
      // html: html,

      from: "ttesttest942@gmail.com",
      to: "zorairtest.2023@gmail.com",  // admin mail
      subject: "Account registrated",
      html: html,

    };

    await transporter.sendMail(mailOptions);
  },
};

module.exports = Mailer;
