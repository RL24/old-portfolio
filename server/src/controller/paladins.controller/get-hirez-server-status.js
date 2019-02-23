const Methods = require('./methods');

module.exports = {
    GetHirezServerStatus: (req, res) => {
        Methods.GET_HIREZ_SERVER_STATUS.request(req, (data) => {

        });
    },

    GetDataUsed: (req, res) => {
        Methods.GET_DATA_USED.request(req, (data) => {

        })
    }
};