const sgMail = require('@sendgrid/mail');
const { URL } = require('url');
const { APIKEY, templates, sender } = require('../configs/sendgrid');

module.exports = () => {
  sgMail.setApiKey(APIKEY);

  const app = {};

  app.sendLoginVerification = (toEmail, verificationLink) => {
    console.log(verificationLink);
    const msg = {
      to: toEmail,
      from: sender,
      subject: 'Login Verification',
      templateId: templates.login,
      dynamic_template_data: {
        subject: 'Login Verification - HireMe',
        verificationLink: verificationLink,
      },
    };
    sgMail.send(msg);
  };

  return app;
};
