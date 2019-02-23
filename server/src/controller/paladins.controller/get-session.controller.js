const moment = require('moment');

const { DatabaseUtility, UtilityModule } = require('../../modules');

const { CreateSession } = require('./create-session.controller');

module.exports = {
    GetSession: (callback) => {
        const timestamp = moment().utc().valueOf();
        DatabaseUtility.query('SELECT session_id, expires_at FROM session WHERE expires_at > ? LIMIT 1', [timestamp], (sessionRows) => {
            if (UtilityModule.isQueryEmpty(sessionRows)) {
                CreateSession(({ session_id }) => {
                    DatabaseUtility.query('INSERT INTO session (session_id, expires_at) VALUES (?, ?)', [session_id, timestamp + 900000], (_) => { });
                    callback(session_id);
                });
            } else {
                callback(sessionRows[0].session_id);
            }
        });
    }
};