const sgMail = require('@sendgrid/mail');
const { APIKEY, sender } = require('../configs/sendgrid');

module.exports = () => {
  sgMail.setApiKey(APIKEY);

  const app = {};

  app.sendLoginVerification = (toEmail, verificationLink) => {
    const msg = {
      to: toEmail,
      from: sender,
      subject: 'Login Verification',
      dynamic_template_data: {
        subject: 'Login Verification',
        verificationLink,
      },
    };
    sgMail.send(msg);
  };

  return app;
};
