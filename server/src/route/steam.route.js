const { RouteType } = require('./route.utility');
const SteamController = require('../controller/steam.controller');

exports.__routeNames = [
    { name: 'getNewsForApp/:appId', controller: SteamController.GetNewsForApp },
    { name: 'getGlobalAchievementPercentagesForApp/:gameId', controller: SteamController.GetGlobalAchievementPercentagesForApp },
    { name: 'getGlobalStatsForGame/:gameId/:names', controller: SteamController.GetGlobalStatsForGame },
    { name: 'getPlayerSummaries/:steamIds', controller: SteamController.GetPlayerSummaries },
    { name: 'getFriendList/:steamId', controller: SteamController.GetFriendList },
    { name: 'getPlayerAchievements/:steamId/:appId', controller: SteamController.GetPlayerAchievements },
    { name: 'getUserStatsForGame/:steamId/:appId', controller: SteamController.GetUserStatsForGame },
    { name: 'getOwnedGames/:steamId/:appInfo?', controller: SteamController.GetOwnedGames },
    { name: 'getRecentlyPlayedGames/:steamId', controller: SteamController.GetRecentlyPlayedGames },
    { name: 'isPlayingSharedGame/:steamId/:appId', controller: SteamController.IsPlayingSharedGame },
    { name: 'getSchemaForGame/:appId', controller: SteamController.GetSchemaForGame },
    { name: 'getPlayerBans/:steamIds', controller: SteamController.GetPlayerBans }
];

exports.__routeNames.forEach((route) => {
    exports[route.name] = {
        type: RouteType.GET,
        route: `/steam/${route.name}`,
        controller: route.controller
    };
});