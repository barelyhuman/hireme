const sgMail = require('@sendgrid/mail');
const { URL } = require('url');
const { APIKEY, templates, sender } = require('../configs/sendgrid');

module.exports = () => {
  if (process.env.NODE_ENV !== 'development') {
    sgMail.setApiKey(APIKEY);
  }

  const app = {};

  app.sendLoginVerification = (toEmail, verificationLink) => {
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

    if (process.env.NODE_ENV === 'development') {
      console.log(verificationLink);
    } else {
      sgMail.send(msg);
    }
  };

  return app;
};
