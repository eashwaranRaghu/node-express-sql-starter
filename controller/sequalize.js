const env = require('../environment/env');
const Sequelize = require('sequelize');
let sequelize;

module.exports = {
    connect: () => {
        sequelize = new Sequelize(env.sql.database, env.sql.user, env.sql.password, {
            host: env.sql.host,
            dialect: env.sql.dialect,
            operatorsAliases: false,
            pool: {
                max: 90,
                min: 0,
                acquire: 30000,
                idle: 10000
            },
        });
    },
    auth : () => {
        sequelize
            .authenticate()
            .then(() => {
                console.log('Connection has been established successfully.');
            })
            .catch(err => {
                console.error('Unable to connect to the database:', err);
            });
    },
    connection : () => {
        return sequelize;
    }
};