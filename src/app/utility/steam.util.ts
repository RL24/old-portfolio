export interface GetPlayerSummaries {
  response: {
    players: SteamUser[]
  };
}

export interface SteamUser {
  steamid: string;
  communityvisibilitystate: number;
  profilestate: number;
  personaname: string;
  lastlogoff: number;
  commentpermission: number;
  profileurl: string;
  avatar: string;
  avatarmedium: string;
  avatarfull: string;
  personastate: number;
  primaryclanid: string;
  timecreated: number;
  personastateflags: number;
}

export interface GetOwnedGames {
  response: {
    game_count: number,
    games: SteamGame[]
  };
}

export interface SteamGame {
  appid: number;
  playtime_forever: number;
  name: string;
  img_icon_url: string;
  img_logo_url: string;
  has_community_visible_stats: boolean;
}