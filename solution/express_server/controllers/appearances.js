var Appearances = require('../models/appearances');

//prova
function getAllAppearances() {
    return new Promise((resolve, reject) => {
        Appearances.find({appearance_id: '2233748_79232'})
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the top 15 players with the most red cards from the database.
 * @returns {Promise} - A promise that resolves with the retrieved data or rejects with an error.
 */
function mostRedCards() {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $group: {
                    _id: "$player_id",
                    player_name: {$first: "$player_name"},
                    red_cards: {$sum: "$red_cards"}
                }
            },
            {$sort: {red_cards: -1}},
            {$limit: 15}
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the top 20 players with the most yellow cards from the database.
 * @returns {Promise} - A promise that resolves with the retrieved data or rejects with an error.
 */
function mostYellowCards() {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $group: {
                    _id: "$player_id",
                    player_name: {$first: "$player_name"},
                    yellow_cards: {$sum: "$yellow_cards"}
                }
            },
            {$sort: {yellow_cards: -1}},
            {$limit: 20}
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total minutes played by a specific player from the database.
 * @param {number} playerId - The ID of the player for whom to retrieve minutes played.
 * @returns {Promise} - A promise that resolves with the total minutes played or rejects with an error.
 */
function totalMinutesPlayed(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId}
            },
            {
                $group: {
                    _id: null,
                    totalMinutes: {$sum: "$minutes_played"}
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalMinutes);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total goals scored by a specific player from the database.
 * @param {number} playerId - The ID of the player for whom to retrieve total goals scored.
 * @returns {Promise} - A promise that resolves with the total goals scored or rejects with an error.
 */
function totalGoalsScored(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId}
            },
            {
                $group: {
                    _id: null,
                    totalGoals: {$sum: "$goals"}
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalGoals);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total assists made by a specific player from the database.
 * @param {number} playerId - The ID of the player for whom to retrieve total assists.
 * @returns {Promise} - A promise that resolves with the total assists or rejects with an error.
 */
function totalAssists(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId}
            },
            {
                $group: {
                    _id: null,
                    totalAssists: {$sum: "$assists"}
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalAssists);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total red cards received by a specific player from the database.
 * @param {number} playerId - The ID of the player for whom to retrieve total red cards.
 * @returns {Promise} - A promise that resolves with the total red cards or rejects with an error.
 * */

function redCardsAPlayer(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId}
            },
            {
                $group: {
                    _id: "$player_id",
                    player_name: {$first: "$player_name"},
                    red_cards: {$sum: "$red_cards"}
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total yellow cards received by a specific player from the database.
 * @param {number} playerId - The ID of the player for whom to retrieve total yellow cards.
 * @returns {Promise} - A promise that resolves with the total yellow cards or rejects with an error.
 * */

function yellowCardsAPlayer(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId}
            },
            {
                $group: {
                    _id: "$player_id",
                    player_name: {$first: "$player_name"},
                    yellow_cards: {$sum: "$yellow_cards"}
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0]);
                } else {
                    resolve(null);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}


/**
 * Retrieves the first and last appearance of a player in each club.
 * @param {Number} playerId - The ID of the player.
 * @returns {Promise} - A promise that resolves with the first and last appearances for each club.
 * */
function getPlayerAppearances(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: {player_id: playerId} // Filtra per ID del giocatore
            },
            {
                $group: {
                    _id: "$player_club_id",
                    firstAppearance: {$min: "$date"},
                    lastAppearance: {$max: "$date"},
                    player_name: {$first: "$player_name"}
                }
            },
            {
                $project: {
                    _id: 0,
                    club_id: "$_id",
                    player_name: 1,
                    firstAppearance: 1,
                    lastAppearance: 1
                }
            },
            {
                $sort: {firstAppearance: -1}
            }
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Function to get the total number of red cards for a team in a match given its ID and the team's ID.
 * @param {Number} gameId - ID of the match.
 * @param {Number} clubId - ID of the team.
 * @returns {Promise} - A promise that resolves to the total number of red cards.
 */

function getTeamTotalRedCards(gameId, clubId) {
    return new Promise((resolve, reject) => {
        Appearances.find({game_id: gameId, player_club_id: clubId})
            .then(results => {
                if (results.length > 0) {
                    const totalRedCards = results.reduce((sum, appearance) => sum + appearance.red_cards, 0);
                    resolve(totalRedCards);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the total number of yellow cards for a team in a match given its ID and the team's ID.
 * @param {Number} gameId - ID of the match.
 * @param {Number} clubId - ID of the team.
 * */

function getTeamTotalYellowCards(gameId, clubId) {
    return new Promise((resolve, reject) => {
        console.log("gameId:", gameId, "clubId:", clubId);

        Appearances.find({game_id: gameId, player_club_id: clubId})
            .then(results => {
                console.log("Find results:", results);
                if (results.length > 0) {
                    const totalYellowCards = results.reduce((sum, appearance) => sum + appearance.yellow_cards, 0);
                    resolve(totalYellowCards);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Function to get the total number of assists for a team in a match given its ID and the team's ID.
 * @param {Number} gameId - ID of the match.
 * @param {Number} clubId - ID of the team.
 * @returns {Promise} - A promise that resolves to the total number of assists.
 */

function getTeamTotalAssists(gameId, clubId) {
    return new Promise((resolve, reject) => {
        Appearances.find({game_id: gameId, player_club_id: clubId})
            .then(results => {
                if (results.length > 0) {
                    const totalAssists = results.reduce((sum, appearance) => sum + appearance.assists, 0);
                    resolve(totalAssists);
                } else {
                    resolve(0);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Retrieves the top 8 goal scorers from the database.
 * @returns {Promise} - A promise that resolves with the retrieved data or rejects with an error.
 */

function top8GoalScorers() {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $group: {
                    _id: "$player_id",
                    totalGoals: {$sum: "$goals"} // Somma i gol
                }
            },
            {
                $sort: {totalGoals: -1}
            },
            {
                $limit: 8
            }
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = {
    getAllAppearances,
    mostRedCards,
    mostYellowCards,
    totalMinutesPlayed,
    totalGoalsScored,
    totalAssists,
    redCardsAPlayer,
    yellowCardsAPlayer,
    getPlayerAppearances,
    getTeamTotalRedCards,
    getTeamTotalYellowCards,
    getTeamTotalAssists,
    top8GoalScorers
};