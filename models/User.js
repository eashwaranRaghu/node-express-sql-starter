const connection = require('../controller/sequalize').connection();
const Sequelize = require('sequelize');
const Package = require('./Package');

const User = connection.define('User', {
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
    email: {
        type: Sequelize.STRING,
        unique: true
    },
    storageConsumed: {
        type: Sequelize.STRING
    },
    verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    billingAgreementId: {
        type: Sequelize.STRING,
        unique: true
    },
    expiration: {
        type: Sequelize.STRING
    },
    package: {
        type: Sequelize.INTEGER,
        references: {
            model: Package,
            key: 'id',
        }
    }
});
module.exports = User;