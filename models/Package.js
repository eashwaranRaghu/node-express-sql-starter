const connection = require('../controller/sequalize').connection();
const Sequelize = require('sequelize');

const Package = connection.define('Package', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    title: {
        type: Sequelize.STRING,
        unique: true
    },
    description: {
        type: Sequelize.STRING
    },
    trial: {
        type: Sequelize.STRING
    },
    minusers: {
        type: Sequelize.STRING
    },
    price: {
        type: Sequelize.STRING
    },
    storage: {
        type: Sequelize.STRING
    },
    billingPlan: {
        type: Sequelize.TEXT
    },
    billingPlanID: {
        type: Sequelize.STRING
    }
});
module.exports = Package;
