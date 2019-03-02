const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt-nodejs');
const env = require('../environment/env');
// const mailer = require('../middlewares/mailer');
const checkToken = require('../middlewares/checkJWT');
const User = require('../models/User');

router.get('/', (req, res, next) =>
{
    res.json({msg: "userRouter Works!"});
    next();
});

router.post('/register', (req, res, next) =>
    {
        let body = req.body;
        body.password =  bcrypt.hashSync(body.password, null);
        User.findOne({
            where : {
                email: body.email,
            }
        })
            .then(r => {
                if(r){
                    res.json({success: false, msg: 'Email already exists'}); next();
                }else{
                    return User.create(body);
                }
            })
            .then(() => {
                let User = {email: body.email};
                let token = jwt.sign(User, env.tokenSecret, {expiresIn: '100 days'});
                res.json({success: true, msg: 'User registered', token: token}); next();
                // mailer.send()
            })
            .catch(err => {
                console.log(err);
                res.json({success: false, msg: 'Error occurred'}); next();
            });
    }
);
router.route('/verify').post(checkToken, (req, res, next) =>
    {
        const body = req.body || {};
        User.findOne({
            where : {
                email: req.decoded.email,
            }
        })
            .then(r => {
                if(body){
                    for(let key in body){
                        if(body.hasOwnProperty(key)){
                            r[key] = body[key];
                        }
                    }
                }
                r.verified = verified;
                return r.save();
            })
            .then(() => {
                res.json({success: true, msg: 'Verified'}); next();
            })
            .catch(err => {
                res.json({success: false, msg: 'something went wrong'}); next();
                console.log(err);
            })
    }
);
router.post('/forgotPassword', (req, res, next) =>
    {

        let User = {};
        User.email = req.body.email;
        var token = jwt.sign(
            User,
            env.tokenSecret,
            {expiresIn: "100 days"});
        User.findOne({
            where : {
                email: User.email,
            }
        })
            .then((r) => {
                if(r){
                    r.name = undefined;
                    r.password = undefined;
                    res.json({success: true, msg: 'Check Email', token: token}); next();
                }else{
                    res.json({success: true, msg: 'No user found'}); next()
                }
            })
            .catch(err => {
                console.log(err);
                res.json({success: false, msg: 'Error occurred'}); next();
            });
    }
);
router.post('/login', (req, res, next) =>
    {
        const body = req.body;
        User.findOne({
            where : {
                email: body.email,
            }
        })
            .then(r => {
            if(!r){
                res.json({success: false, msg: 'User not found'}); next();
            }else{
                if(r.password && body.password && bcrypt.compareSync(body.password, r.password)){
                    let User = {name: r.name, id: r.id};
                    let token = jwt.sign(User, env.tokenSecret, {expiresIn: '100 days'});
                    r.name = undefined; r.password = undefined;
                    res.json({success: true, msg: 'User Found', admin: r, token: token}); next();
                }else{
                    res.json({success: false, msg: 'Wrong Password'}); next();
                }
            }
        })
            .catch(err => {
                console.log(err);
                res.json({success: false, msg: 'Error occurred'}); next();
            });
    }
);
router.route('/update').post(checkToken , (req, res, next) =>
    {
        const body = req.body;
        User.findOne({
            where : {
                email: req.decoded.email,
            }
        })
            .then(r => {
                for(let key in body){
                    if(body.hasOwnProperty(key)){
                        r[key] = body[key];
                    }
                }
                console.log(r);
                return r.save();
            })
            .then(() => {
                res.json({success: true, msg: 'Updated'}); next();
            })
            .catch(err => {
                res.json({success: false, msg: 'something went wrong'}); next();
                console.log(err);
            })
    }
);
router.route('/fetch').post(checkToken, (req, res, next) =>
    {
        User.findOne({
            where : {
                email: req.decoded.email,
            }
        })
            .then((r) => {
                r.name = undefined;
                r.password = undefined;
                res.json({success: true, msg: 'Updated Smtp', result: r}); next();
            })
            .catch(err => {
                console.log(err);
                res.json({success: false, msg: 'Error occurred'}); next();
            });
    }
);
module.exports = router;