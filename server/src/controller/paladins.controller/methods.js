const md5 = require('md5');
const needle = require('needle');

const { UtilityModule } = require('../../modules');

class Method {
    constructor(name, hasDevId, hasSignature, hasSession, hasTimestamp, params) {
        this.name = name;
        this.hasDevId = hasDevId;
        this.hasSignature = hasSignature;
        this.hasSession = hasSession;
        this.hasTimestamp = hasTimestamp;
        this.params = params;
    }
    
    generateSignature(timestamp) {
        return md5(`${UtilityModule.DEV_ID()}${this.name}${UtilityModule.API_KEY()}${timestamp}`);
    }

    build(req, callback) {
        const values = [];

        const timestamp = UtilityModule.generateTimestamp();

        if (this.hasDevId) values.push(UtilityModule.DEV_ID());
        if (this.hasSignature) values.push(this.generateSignature(timestamp));

        if (this.hasSession) {
            exports.getSession((sessionId) => {
                values.push(sessionId);
                this.compile(timestamp, values, callback, req);
            });
        } else {
            this.compile(timestamp, values, callback, req);
        }
    }

    compile(timestamp, values, callback, req) {
        if (this.hasTimestamp) values.push(timestamp);

        if (req != null && this.params != null && this.params.length > 0) {
            this.params.forEach((param) => {
                values.push(req.params[param]);
            });
        }

        const valuesConcat = values.join('/');
        callback(`${UtilityModule.ENDPOINT()}${this.name}${UtilityModule.RETURN_TYPE()}${valuesConcat.length > 0 ? `/${valuesConcat}` : ''}`);
    }

    request(req, callback) {
        this.build(req, (url) => {
            needle.get(url, (error, response) => {
                callback(error || response == null || response.statusCode !== 200 ? error : response.body);
            });
        });
    }
}

module.exports = {
    CREATE_SESSION: new Method('createsession', true, true, false, true, []),
    GET_HIREZ_SERVER_STATUS: new Method('gethirezserverstatus', true, true, true, true, []),
    GET_DATA_USED: new Method('getdataused', true, true, true, true, []),
    GET_ESPORTS_PRO_LEAGUE_DETAILS: new Method('getesportsproleaguedetails', true, true, true, true, []),
    GET_FRIENDS: new Method('getfriends', true, true, true, true, ['playerName']),
    GET_CHAMPION_RANKS: new Method('getchampionranks', true, true, true, true, ['playerName']),
    GET_CHAMPIONS: new Method('getchampions', true, true, true, true, ['language']),
    GET_CHAMPION_SKINS: new Method('getchampionskins', true, true, true, true, ['championId', 'language']),
    GET_ITEMS: new Method('getitems', true, true, true, true, ['language']),
    GET_MATCH_DETAILS: new Method('getmatchdetails', true, true, true, true, ['matchId']),
    GET_MATCH_DETAILS_BATCH: new Method('getmatchdetailsbatch', true, true, true, true, ['matchIds']),
    GET_MATCH_IDS_BY_QUEUE: new Method('getmatchidsbyqueue', true, true, true, true, ['queue', 'date', 'hour']),
    GET_LEAGUE_LEADERBOARD: new Method('getleagueleaderboard', true, true, true, true, ['queue', 'tier', 'season']),
    GET_LEAGUE_SEASONS: new Method('getleagueseasons', true, true, true, true, ['queue']),
    GET_MATCH_HISTORY: new Method('getmatchhistory', true, true, true, true, ['playerName']),
    GET_PLAYER: new Method('getplayer', true, true, true, true, ['playerName']),
    GET_PLAYER_LOADOUTS: new Method('getplayerloadouts', true, true, true, true, ['playerName', 'language']),
    GET_PLAYER_STATUS: new Method('getplayerstatus', true, true, true, true, ['playerName']),
    GET_QUEUE_STATS: new Method('getqueuestats', true, true, true, true, ['playerName', 'queue']),
    GET_PATCH_INFO: new Method('getpatchinfo', true, true, true, true, [])
};