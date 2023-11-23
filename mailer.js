const nodemailer = require('nodemailer');
function sendMail(email,mailSubject,content) {
    return new Promise((resolve, reject) => {
      let mailOptions = {
        from: 'mcaconnect.moderator@gmail.com',
        to: email,
        subject: mailSubject,
        html: content,
      };
      let mailConfig = {
        service: 'gmail',
        auth: {
          user: 'mcaconnect.moderator@gmail.com',
          pass: 'msrjcgeaouhdalyi'
        }
      };
      nodemailer.createTransport(mailConfig).sendMail(mailOptions, (err, info) => {
        if (err) {
          reject(err);
        } else {
          console.log("Mail Delivered To : " + email);
          resolve(info);
        }
      });
    });
  }
  module.exports=sendMail