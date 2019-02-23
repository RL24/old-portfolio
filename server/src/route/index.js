const PaladinsRoute = require('./paladins.route');
const SteamRoute = require('./steam.route');

exports.__routes = [
    ...PaladinsRoute.__routeNames.map((routeName) => PaladinsRoute[routeName.name]),
    ...SteamRoute.__routeNames.map((routeName) => SteamRoute[routeName.name])
];