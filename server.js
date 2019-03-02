const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const app = express();
const env = require('./environment/env');
const sequalize = require('./controller/sequalize');

app.use(fileUpload('createParentPath'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));
app.use(morgan('dev'));
app.use(cors());
app.use(express.static('public'));

sequalize.connect();
/*
const Admin = require('./models/Admin');
const Package = require('./models/Package');*/

const adminRouter = require('./router/admin'); app.use('/admin', adminRouter);
const userRouter = require('./router/user'); app.use('/user', userRouter);
const packageRouter = require('./router/package'); app.use('/package', packageRouter);

app.get('*', (req, res) => res.send('M*EN starter'));

sequalize.connection()
    .authenticate()
    .then(() => {
        console.log('DB authentication successful');
        sequalize.connection()
            .sync()
            .then(() =>{
                app.listen(env.port, err =>
                    {
                        if(err){console.log("Error Listening")}
                        else{console.log('=*=*=*=*=*=*= Server is happy =*=*=*=*=*=*=')}
                    }
                );
            })
            .catch(err => console.log(err));
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });