const { RouteType } = require('./route.utility');
const PaladinsController = require('../controller/paladins.controller');

exports.__routeNames = [
    { name: 'getHirezServerStatus', controller: PaladinsController.GetHirezServerStatus },
    { name: 'getDataUsed', controller: PaladinsController.GetDataUsed },
    { name: 'getEsportsProLeagueDetails', controller: PaladinsController.GetEsportsProLeagueDetails },
    { name: 'getFriends/:playerName', controller: PaladinsController.GetFriends },
    { name: 'getChampionRanks/:playerName', controller: PaladinsController.GetChampionRanks },
    { name: 'getChampions/:language', controller: PaladinsController.GetChampions },
    { name: 'getChampionSkins/:championId/:language', controller: PaladinsController.GetChampionSkins },
    { name: 'getItems/:language', controller: PaladinsController.GetItems },
    { name: 'getMatchDetails/:matchId', controller: PaladinsController.GetMatchDetails },
    { name: 'getMatchDetailsBatch/:matchIds', controller: PaladinsController.GetMatchDetailsBatch },
    { name: 'getMatchIdsByQueue/:queue/:date/:hour', controller: PaladinsController.GetMatchIdsByQueue },
    { name: 'getLeagueLeaderboard/:queue/:tier/:season', controller: PaladinsController.GetLeagueLeaderboard },
    { name: 'getLeagueSeasons/:queue', controller: PaladinsController.GetLeagueSeasons },
    { name: 'getMatchHistory/:playerName', controller: PaladinsController.GetMatchHistory },
    { name: 'getPlayer/:playerName', controller: PaladinsController.GetPlayer },
    { name: 'getPlayerLoadouts/:playerName/:language', controller: PaladinsController.GetPlayerLoadouts },
    { name: 'getPlayerStatus/:playerName', controller: PaladinsController.GetPlayerStatus },
    { name: 'getQueueStats/:playerName/:queue', controller: PaladinsController.GetQueueStats },
    { name: 'getPatchInfo', controller: PaladinsController.GetPatchInfo }
];

exports.__routeNames.forEach((route) => {
    exports[route.name] = {
        type: RouteType.GET,
        route: `/paladins/${route.name}`,
        controller: route.controller
    };
});