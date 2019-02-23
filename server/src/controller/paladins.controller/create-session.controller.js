const Methods = require('./methods');

module.exports = {
    CreateSession: (req, res, callback) => {
        Methods.CREATE_SESSION.request(callback);
    }
};