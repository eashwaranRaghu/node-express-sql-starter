const exp = {
    backend: 'http://localhost:8080/',
    frontEnd: 'http://localhost:4200/',
    sql: {
        connectionLimit : 200,
        host: 'localhost',
        user: 'root',
        password: 'juggernaut',
        database: 'juggernaut',
        port: 3306,
        ssl: {
            rejectUnauthorized: false
        },
        dialect: 'mysql'
    },
    tokenSecret: 'asdfjkl0902g',
    port: process.env.PORT || 8080,
    smtp: {
        service: '',
        email: '',
        password: ''
    }
};

module.exports = exp;

