const { CreateSession } = require('./create-session.controller');
const { GetSession } = require('./get-session.controller');
const GetHirezServerStatus = require('./get-hirez-server-status');

module.exports = {
    ...GetHirezServerStatus,
    
    getDataUsed: () => {
        return {
            handler: (req, res) => {
                GET_DATA_USED.request((response) => {
                    res.send(response);
                });
            }
        };
    },
    
    getEsportsProLeagueDetails: () => {
        return {
            handler: (req, res) => {
                GET_ESPORTS_PRO_LEAGUE_DETAILS.request((response) => {
                    res.send(response);
                });
            }
        };
    },
    
    getFriends: () => {
        return {
            handler: (req, res) => {
                GET_FRIENDS.request((response) => {
                    res.send(response);
                }, req);
            }
        };
    },
    
    getChampionRanks: () => {
        return {
            handler: (req, res) => {
                GET_CHAMPION_RANKS.request((response) => {
                    res.send(response);
                }, req);
            }
        };
    }
};

exports.getChampions = {
    handler: (req, res) => {
        const timestamp = moment().utc().valueOf();
        DatabaseUtility.query('SELECT table_id, expires_at FROM table_expiry WHERE table_id = ?', ['champion'], (championExpiry) => {
            if (Utility.isQueryEmpty(championExpiry) || championExpiry[0].expires_at < timestamp) {
                GET_CHAMPIONS.request((champions) => {
                    champions = champions.map((champion) => {
                        const out = {
                            id: champion.id,
                            name: champion.Name,
                            card_url: champion.ChampionCard_URL,
                            icon_url: champion.ChampionIcon_URL,
                            health: champion.Health,
                            lore: champion.Lore,
                            on_rotation: champion.OnFreeRotation === 'true' ? 1 : 0,
                            role: champion.Roles.substring('Paladins '.length),
                            speed: champion.Speed,
                            title: champion.Title,
                            latest: champion.latestChampion === 'n' ? 0 : 1,
                        };

                        for (let i = 1; i <= 5; i++) {
                            const ability = champion[`Ability_${i}`];
                            out[`ability_${i}_id`] = ability.Id
                            out[`ability_${i}_name`] = ability.Summary
                            out[`ability_${i}_description`] = ability.Description
                            out[`ability_${i}_image_url`] = ability.URL
                        }

                        return out;
                    });

                    DatabaseUtility.query('REPLACE INTO table_expiry (table_id, expires_at) VALUES (?, ?)', ['champion', timestamp + 604800000], (_) => {});

                    DatabaseUtility.query(
                        `REPLACE INTO champion (${Object.keys(champions[0]).join(', ')}) VALUES ${champions.map((champion) => `(${Object.keys(champion).map((key) => '?').join(', ')})`).join(', ')}`,
                        [].concat(...champions.map((champion) => Object.values(champion))),
                        (_) => {}
                    );
                    
                    res.send(champions);
                }, req);
            } else {
                DatabaseUtility.query('SELECT * FROM champion ORDER BY name ASC', [], (champions) => {
                    res.send(champions);
                });
            }
        });
    }
};

exports.getChampionSkins = {
    handler: (req, res) => {
        GET_CHAMPION_SKINS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getItems = {
    handler: (req, res) => {
        GET_ITEMS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getMatchDetails = {
    handler: (req, res) => {
        GET_MATCH_DETAILS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getMatchDetailsBatch = {
    handler: (req, res) => {
        GET_MATCH_DETAILS_BATCH.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getMatchIdsByQueue = {
    handler: (req, res) => {
        const timestamp = moment().utc().valueOf();
        DatabaseUtility.query('SELECT table_id, expires_at FROM table_expiry WHERE table_id = ?', ['match_ids'], (matchIdsExpiry) => {
            if (Utility.isQueryEmpty(matchIdsExpiry) || matchIdsExpiry[0].expires_at < timestamp) {
                if (!Utility.isQueryEmpty(matchIdsExpiry)) {
                    
                } else {

                }
            } else {

            }
        });

        GET_MATCH_IDS_BY_QUEUE.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getLeagueLeaderboard = {
    handler: (req, res) => {
        GET_LEAGUE_LEADERBOARD.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getLeagueSeasons = {
    handler: (req, res) => {
        GET_LEAGUE_SEASONS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getMatchHistory = {
    handler: (req, res) => {
        GET_MATCH_HISTORY.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getPlayer = {
    handler: (req, res) => {
        GET_PLAYER.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getPlayerLoadouts = {
    handler: (req, res) => {
        GET_PLAYER_LOADOUTS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getPlayerStatus = {
    handler: (req, res) => {
        GET_PLAYER_STATUS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getQueueStats = {
    handler: (req, res) => {
        GET_QUEUE_STATS.request((response) => {
            res.send(response);
        }, req);
    }
};

exports.getPatchInfo = {
    handler: (req, res) => {
        GET_PATCH_INFO.request((response) => {
            res.send(response);
        });
    }
};
