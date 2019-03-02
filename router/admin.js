const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkToken = require('../middlewares/checkJWT');
const Admin = require('../models/Admin');
const env = require('../environment/env');
router.get('/', (req, res, next) =>
{
    res.json({msg: "adminRouter Works!"});
    next();
});

router.post('/login', (req, res, next) =>
    {
        const body = req.body;
        Admin.findOne({
            where : {
                id: 1,
            }
        })
            .then(r => {
            if(!r){
                res.json({success: false, msg: 'DB empty'}); next();
            }else{
                if(body.password === r.password && body.name === r.name){
                    let User = {name: r.name, id: r.id};
                    let token = jwt.sign(User, env.tokenSecret, {expiresIn: '100 days'});
                    r.name = undefined; r.password = undefined;
                    res.json({success: true, msg: 'Admin Found', admin: r, token: token}); next();
                }else{
                    res.json({success: false, msg: 'Wrong Credentials'}); next();
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
        Admin.findByPk(1)
            .then(r => {
                for(let key in body){
                    if(body.hasOwnProperty(key)){
                        r[key] = body[key];
                    }
                }
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
        Admin.findById(1)
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