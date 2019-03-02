const nodemailer = require('nodemailer');
const env = require('../enviornment/env');
const services = require('./services');
const mysql = require('mysql');
const verification = require('../views/verification').reference;

// const html = require('../views/reference').reference;
/*const resetPassword = require('../views/resetPassword').reference;
const device = require('../views/device').reference;
const notification = require('../views/notification').reference;*/
module.exports = {
    "send": function(_to,token, url){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        // for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        trans = {...services[results3[0].smtp3]};
                    }
                }
                trans.auth = {
                    user: results3[0].smtp1,
                    pass: results3[0].smtp2
                };
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Email Verification', // Subject line
                    html: verification(env.frontEnd + url +  token, 'HF1', 'HF2')
                    /*html: '<h1>Hello!</h1> <p>Please verify your email by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "refer": function(emp, candidate, link){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                /*let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        trans =  {auth: {
                                user: results3[0].smtp1,
                                pass: results3[0].smtp2
                            }, ...services[results3[0].smtp3]};
                    }
                }
                trans.tls = {
                    rejectUnauthorized: false
                };*/
                let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        // for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        trans = {...services[results3[0].smtp3]};
                    }
                }
                trans.auth = {
                    user: results3[0].smtp1,
                    pass: results3[0].smtp2
                };
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: emp, // list of receivers
                    subject: 'Job Referencing', // Subject line
                    html: html(candidate, link)
                    /*html: `<h1>Hello!</h1> <p><b>${candidate.name}</b> with email ${candidate.email} has asked for your reference for a job. <br> To refer, visit  <a href="${link}">${link}</a>. <br> Ignore otherwise.</p>`, // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "reset": function(_to,token, url){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {auth: {
                        user: results3[0].smtp1,
                        pass: results3[0].smtp2
                    }};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                    }
                }
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Password Recovery', // Subject line
                    html: resetPassword(env.frontEnd + url +  token, 'HF1', 'HF2')
                    /*html: '<h1>Hello!</h1> <p>Please reset your password by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "resetP": function(_to,token, url){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {auth: {
                        user: results3[0].smtp1,
                        pass: results3[0].smtp2
                    }};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                    }
                }
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Password Recovery', // Subject line
                    html: resetPassword(env.candidatesPool + url +  token, 'CP1', 'CP2')
                    /*html: '<h1>Hello!</h1> <p>Please reset your password by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "branch": function(_to,token, url){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {
                let trans = {auth: {
                        user: results3[0].smtp1,
                        pass: results3[0].smtp2
                    }};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                    }
                }
                const transporter = nodemailer.createTransport(trans);

                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Email Verification', // Subject line
                    html: verification(env.frontEnd + url +  token)
                    /*html: '<h1>Hello!</h1> <p>Please verify your email and set new password by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "sendP": function(_to,token, url){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        // for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        trans = {...services[results3[0].smtp3]};
                    }
                }
                trans.auth = {
                    user: results3[0].smtp1,
                    pass: results3[0].smtp2
                };
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Email Verification', // Subject line
                    html: verification(env.candidatesPool + url +  token, 'CP1', 'CP2')
                    /*html: '<h1>Hello!</h1> <p>Please verify your email by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },

    "device": function(_to,token, url, a, b){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        // for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        trans = {...services[results3[0].smtp3]};
                    }
                }
                trans.auth = {
                    user: results3[0].smtp1,
                    pass: results3[0].smtp2
                };
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'New Device Detected', // Subject line
                    html: device(env.candidatesPool + url, token, a, b)
                    /*html: '<h1>Hello!</h1> <p>Please verify your email by visiting this <a href="'+ env.frontEnd + url +  token + '">Link</a></p>', // html body*/
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },

    "notification2": function(emp, total, note, subject, link, site, a, b){
        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        // for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        trans = {...services[results3[0].smtp3]};
                    }
                }
                trans.auth = {
                    user: results3[0].smtp1,
                    pass: results3[0].smtp2
                };
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: emp.email, // list of receivers
                    subject: subject, // Subject line
                    html: notification(emp['name'] || ' ', total, note, link, site, a, b)
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
    "notification": function(manager, counts){
        let message1 = 'You have following unseen requests:';
        let message='';
        if(counts.overtime>0){message+= ('\n Overtime Requests: ' + counts.overtime.toString());}
        if(counts.holidayrequests!=0){message+= ('\n Holiday Requests: ' + counts.holidayrequests);}
        if(counts.appraisal!=0){message+= ('\n Holiday Appraisals: ' + counts.appraisal);}
        if(counts.trip!=0){message+= ('\n Business Trip Requests: ' + counts.trip);}
        if(counts.reports!=0){message+= ('\n Reports: ' + counts.reports);}
        console.log(message);

        if(message!='')
        {
            con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
                {
                    let trans = {auth: {
                            user: results3[0].smtp1,
                            pass: results3[0].smtp2
                        }};
                    if(results3 && results3[0] && results3[0].smtp3)
                    {
                        if(services[results3[0].smtp3.toString()])
                        {
                            for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                        }
                    }
                    const transporter = nodemailer.createTransport(trans);
                    var mailOptions = {
                        from: 'ADMIN <' + results3[0].smtp1 + '>',
                        to: manager,
                        subject: 'Manager Notification',
                        text: message1+ message
                    };
                    if(manager.includes('com'))
                    {
                        transporter.sendMail(mailOptions, function(error, info){
                            if (error) {
                                return console.log(error);
                            }
                            console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                        })
                    }
                    else{console.log('not a valid email');}
                }
            );
        }
        else{
            console.log("email not sent to: " + manager + ", nothing to send");
        }

    },
    "appraisalNotification": function(_to,sdate, edate){

        con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
            {

                let trans = {auth: {
                        user: results3[0].smtp1,
                        pass: results3[0].smtp2
                    }};
                if(results3 && results3[0] && results3[0].smtp3)
                {
                    if(services[results3[0].smtp3.toString()])
                    {
                        for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];
                    }
                }
                const transporter = nodemailer.createTransport(trans);
                // setup email data with unicode symbols
                var mailOptions = {
                    from: 'ADMIN <' + results3[0].smtp1 + '>',
                    to: _to, // list of receivers
                    subject: 'Appraisal Period About To End', // Subject line
                    html: '<h1>Hello!</h1> <p>The Appraisal Period '+ sdate + ' to '+ edate +'  is about to end please make sure your responses are ready.</p>', // html body
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message ' + info.messageId + ' sent: %s' + info.response);
                })
            }
        );
    },
};

/*

"refer": function(emp, HRemail, candidate, json){

    con.query( 'SELECT * FROM admin LIMIT 1', (err3, results3, fields3) =>
        {

            let trans = {};
            if(results3 && results3[0] && results3[0].smtp3)
            {
                if(services[results3[0].smtp3.toString()])
                {
                    /!*for(var k in services[results3[0].smtp3]) trans[k] = services[results3[0].smtp3][k];*!/
                    trans =  {auth: {
                            user: results3[0].smtp1,
                            pass: results3[0].smtp2
                        }, ...services[results3[0].smtp3]};
                }
            }
            trans.tls = {
                rejectUnauthorized: false
            };
            const transporter = nodemailer.createTransport(trans);
            // setup email data with unicode symbols
            var mailOptions = {
                from: 'ADMIN <' + results3[0].smtp1 + '>',
                to: emp.email, // list of receivers
                subject: 'Job Referencing', // Subject line
                html: `<h1>Hello!</h1> <p><b>${candidate.name}</b> with email ${candidate.email} has asked for your reference for a job. To refer, send an email to our team at <a href="mailto:${HRemail}?Subject=Job Referencing!">${HRemail}</a>. <br> Ignore otherwise.</p>`, // html body
            };
            transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                    return console.log(error);
                }
                console.log('Message ' + info.messageId + ' sent: %s' + info.response);
            })
        }
    );
}

*/
