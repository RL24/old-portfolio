const needle = require('needle');
const { UtilityModule } = require('../modules');

const WEB_API_KEY = 'B91874D4CC4F6AD654CBC27C54DCDD4E';

const Interface = {
    STEAM_NEWS: 'ISteamNews',
    STEAM_USER_STATS: 'ISteamUserStats',
    STEAM_USER: 'ISteamUser',
    TF_ITEMS: 'ITFItems_440',
    PLAYER_SERVICE: 'IPlayerService'
};

const Version = {
    _1: '0001',
    _2: '0002'
};

module.exports = {
    /**
     * Response Structure:
     * 
     *  appnews
     *      appid
     *      newsitems[]
     *          gid
     *          title
     *          url
     *          is_external_url
     *          author
     *          contents
     *          feedlabel
     *          date
     *          feedname
     *          feed_type
     *          appid
     */
    GetNewsForApp: (req, res, callback) => {
        const appId = req.params.appId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_NEWS, 'GetNewsForApp', Version._2, `appid=${appId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure:
     * 
     *  achievementpercentages
     *      achievements[]
     *          name
     *          percent
     *          
     */
    GetGlobalAchievementPercentagesForApp: (req, res, callback) => {
        const gameId = req.params.gameId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER_STATS, 'GetGlobalAchievementPercentagesForApp', Version._2, `gameid=${gameId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  response
     *      globalstats
     *          <variable>
     *              total
     *      result
     */
    GetGlobalStatsForGame: (req, res, callback) => {
        const gameId = req.params.gameId;
        const names = req.params.names.split(',');
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER_STATS, 'GetGlobalStatsForGame', Version._1, `appid=${gameId}&count=${names.length}&${names.map((val, ind) => `name[${ind}]=${val}`).join('&')}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  response
     *      players[]
     *          steamid
     *          communityvisibilitystate
     *          profilestate
     *          personaname
     *          lastlogoff
     *          commentpermission
     *          profileurl
     *          avatar
     *          avatarmedium
     *          avatarfull
     *          personastate
     *          primaryclanid
     *          timecreated
     *          personastateflags
     */
    GetPlayerSummaries: (req, res, callback) => {
        const steamIds = req.params.steamIds;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER, 'GetPlayerSummaries', Version._2, `key=${WEB_API_KEY}&steamids=${steamIds}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  friendslist
     *      friends[]
     *          steamid
     *          relationship
     *          friend_since
     */
    GetFriendList: (req, res, callback) => {
        const steamId = req.params.steamId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER, 'GetFriendList', Version._1, `key=${WEB_API_KEY}&steamid=${steamId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  playerstats
     *      steamID
     *      gameName
     *      achievements[]
     *          apiname
     *          achieved
     *          unlocktime
     *      success
     */
    GetPlayerAchievements: (req, res, callback) => {
        const steamId = req.params.steamId;
        const appId = req.params.appId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER_STATS, 'GetPlayerAchievements', Version._1, `key=${WEB_API_KEY}&steamid=${steamId}&appid=${appId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  playerstats
     *      steamID
     *      gameName
     *      stats[]
     *          name
     *          value
     *      achievements[]
     *          name
     *          achieved
     */
    GetUserStatsForGame: (req, res, callback) => {
        const steamId = req.params.steamId;
        const appId = req.params.appId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER_STATS, 'GetUserStatsForGame', Version._2, `key=${WEB_API_KEY}&steamid=${steamId}&appid=${appId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  response
     *      game_count
     *      games[]
     *          appid
     *          playtime_forever
     *          -- if appInfo --
     *          name
     *          img_icon_url
     *          img_logo_url
     *          has_community_visible_stats
     */
    GetOwnedGames: (req, res, callback) => {
        const steamId = req.params.steamId;
        const appInfo = req.params.appInfo;
        const url = UtilityModule.buildSteamUrl(Interface.PLAYER_SERVICE, 'GetOwnedGames', Version._1, `key=${WEB_API_KEY}&steamid=${steamId}&include_played_free_games=1${appInfo ? '&include_appinfo=1' : ''}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  response
     *      total_count
     *      games[]
     *          appid
     *          name
     *          playtime_2weeks
     *          playtime_forever
     *          img_icon_url
     *          img_logo_url
     */
    GetRecentlyPlayedGames: (req, res, callback) => {
        const steamId = req.params.steamId;
        const url = UtilityModule.buildSteamUrl(Interface.PLAYER_SERVICE, 'GetRecentlyPlayedGames', Version._1, `key=${WEB_API_KEY}&steamid=${steamId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  response
     *      lender_steamid
     */
    IsPlayingSharedGame: (req, res, callback) => {
        const steamId = req.params.steamId;
        const appId = req.params.appId;
        const url = UtilityModule.buildSteamUrl(Interface.PLAYER_SERVICE, 'IsPlayingSharedGame', Version._1, `key=${WEB_API_KEY}&steamid=${steamId}&appid_playing=${appId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  game
     *      gameName
     *      gameVersion
     *      availableGameStates
     *          stats[]
     *              name
     *              defaultvalue
     *              displayName
     *              hidden
     *              description
     *              icon
     *              icongray
     */
    GetSchemaForGame: (req, res, callback) => {
        const appId = req.params.appId;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER_STATS, 'GetSchemaForGame', Version._2, `key=${WEB_API_KEY}&appid=${appId}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    },

    /**
     * Response Structure
     * 
     *  players[]
     *      SteamId
     *      CommunityBanned
     *      VACBanned
     *      NumberOfVACBans
     *      DaysSinceLastBan
     *      NumberOfGameBans
     *      EconomyBan
     */
    GetPlayerBans: (req, res, callback) => {
        const steamIds = req.params.steamIds;
        const url = UtilityModule.buildSteamUrl(Interface.STEAM_USER, 'GetPlayerBans', Version._1, `key=${WEB_API_KEY}&steamids=${steamIds}`);

        needle.get(url, (error, response, body) => {
            res.send(body);
        });
    }
};