const jwt = require('jsonwebtoken');
const env = require('../environment/env');
module.exports = function(req, res, next){
    let token = req.body.token || req.headers.token;
    if(token){
        jwt.verify(token, env.tokenSecret, function(err, decoded){
            if(err){
                console.log(err);
                res.json({
                    success: false,
                    message: "token failed"
                })
            }
            else{
                req.decoded = decoded;
                next();
            }
        })
    }
    else{
        res.status(403).json({
            success:false,
            message: "No token provided"
        })
    }
};