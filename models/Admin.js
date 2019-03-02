const Sequelize = require('sequelize');
const connection = require('../controller/sequalize').connection();

const Admin = connection.define('Admin', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    PaypalMode: {
        type: Sequelize.STRING
    },
    PaypalId: {
        type: Sequelize.STRING
    },
    PaypalSecret: {
        type: Sequelize.STRING
    },
    SmtpEmail: {
        type: Sequelize.STRING
    },
    SmtpPass: {
        type: Sequelize.STRING
    }
});
module.exports = Admin;
