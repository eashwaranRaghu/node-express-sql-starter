const nodemailer = require('nodemailer');
const env = require('../enviornment/env');
const services = require('./services');

const reference = require('../views/reference').reference;
const resetPassword = require('../views/resetPassword').reference;
const device = require('../views/device').reference;
const notification = require('../views/notification').reference;
module.exports = {
    "send": function(_to,token, url){
        let trans = {};
        if(services[env.smtp.service])
        {
            trans = {...services[env.smtp.service]};
        }
        trans.auth = {
            user: env.smtp.email,
            pass: env.smtp.password
        };
        const transporter = nodemailer.createTransport(trans);
        var mailOptions = {
            from: env.smtp.email,
            subject: 'Subject',
            html: device(env.frontEnd + url +  token, 'HF1', 'HF2')
        };
        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return console.log(error);
            }
            console.log('Message ' + info.messageId + ' sent: %s' + info.response);
        })
    }
};