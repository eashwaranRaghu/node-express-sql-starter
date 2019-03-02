const router = require('express').Router();
const jwt = require('jsonwebtoken');
const checkToken = require('../middlewares/checkJWT');
const Package = require('../models/Package');
const Admin = require('../models/Admin');

router.get('/', (req, res, next) =>
{
    res.json({msg: "packageRouter Works!"});
    next();
});

router.post('/get', (req, res, next) =>
    {
        Package.findAll()
            .then(r => {
                res.json({success: true, msg: 'Packages', result: r}); next();
            })
            .catch(err => {
                res.json({success: false, msg: 'something went wrong'}); next();
                console.log(err);
            });
    }
);

router.route('/add').post(checkToken , (req, res, next) =>
    {
        const body = req.body;
        Package.create(body)
            .then(() => {
                res.json({success: true, msg: 'Created'}); next();
            })
            .catch(err => {
                res.json({success: false, msg: 'something went wrong'}); next();
                console.log(err);
            })
    }
);
router.route('/update').post(checkToken , (req, res, next) =>
    {
        const body = req.body;
        Package.findById(body.id)
            .then(r => {
                for(let key in body){
                    if(body.hasOwnProperty(key) && r.hasOwnProperty(key)){
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
router.route('/delete').post(checkToken , (req, res, next) =>
    {
        const body = req.body;
        Package.findById(body.id)
            .then((p) => {
               return p.destroy();
            })
            .then(() => {
                res.json({success: true, msg: 'Deleted'}); next();
            })
            .catch(err => {
                res.json({success: false, msg: 'something went wrong'}); next();
                console.log(err);
            })
    }
);
module.exports = router;