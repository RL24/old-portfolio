const mysql = require('mysql');

const connection = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD || '',
    database: 'bkuzeaxl_paladins'
});

//connection.connect();

exports.query = (query, values, callback) => {
    /*return connection.query(query, values, (error, results, fields) => {
        callback(error != null ? null : results);
    });*/
    return null;
};