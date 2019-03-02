const moment = require('moment-timezone');
const cron = require("node-cron");
let cornJob = {
    test: function()
    {
        return cron.schedule("* * * * * *", function() {
            console.log(moment().format('DD-MM-YYYY  HH:mm:ss'));
        });
    }
};
module.exports = cornJob;
