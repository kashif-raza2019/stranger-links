var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mailstlinks@gmail.com',
        pass: 'Me@20221297'
    }
});

function writeMail(email, subject, text){
    var mailOptions = {
        from: 'mailstlinks@gmail.com',
        to: email,
        subject: subject,
        text: text 
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = writeMail;
