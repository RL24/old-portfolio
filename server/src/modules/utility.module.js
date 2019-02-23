const moment = require('moment');

module.exports = {
    DEV_ID: () => process.env.PALADINS_DEV_ID,
    API_KEY: () => process.env.PALADINS_API_KEY,
    ENDPOINT: () => process.env.PALADINS_ENDPOINT,
    RETURN_TYPE: () => 'Json',

    getTimeMilliseconds: () => moment().utc().valueOf(),
    generateTimestamp: () => moment().utc().format('YYYYMMDDHHmmss'),
    isQueryEmpty: (results) => results == null || results.length === 0,

    buildSteamUrl: (interface, method, version, params) => {
        return `http://api.steampowered.com/${interface}/${method}/v${version}/?${params}&format=json`;
    }
};