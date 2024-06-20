var Appearance = require('../models/appearances');

//prova
function getAllAppearances() {
    return new Promise((resolve, reject) => {
        Appearance.find({appearance_id:'2233748_79232'})
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
        Appearance.aggregate([
            {
                $group: {
                    _id: "$player_id",
                    player_name: { $first: "$player_name" },
                    red_cards: { $sum: "$red_cards" }
                }
            },
            { $sort: { red_cards: -1 } },
            { $limit: 15 }
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
        Appearance.aggregate([
            {
                $group: {
                    _id: "$player_id",
                    player_name: { $first: "$player_name" },
                    yellow_cards: { $sum: "$yellow_cards" }
                }
            },
            { $sort: { yellow_cards: -1 } },
            { $limit: 20 }
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
        Appearance.aggregate([
            {
                $match: { player_id: playerId }
            },
            {
                $group: {
                    _id: null,
                    totalMinutes: { $sum: "$minutes_played" }
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalMinutes);
                } else {
                    resolve(0); // Se il giocatore non ha nessuna apparizione
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
        Appearance.aggregate([
            {
                $match: { player_id: playerId }
            },
            {
                $group: {
                    _id: null,
                    totalGoals: { $sum: "$goals" }
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalGoals);
                } else {
                    resolve(0); // Se il giocatore non ha segnato nessun gol
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
        Appearance.aggregate([
            {
                $match: { player_id: playerId }
            },
            {
                $group: {
                    _id: null,
                    totalAssists: { $sum: "$assists" }
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalAssists);
                } else {
                    resolve(0); // Se il giocatore non ha fatto nessun assist
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}




module.exports = {
    getAllAppearances, //prova
    mostRedCards, //giocatori con più cartellini rossi
    mostYellowCards, //giocatori con più cartellini gialli
    totalMinutesPlayed, //minuti giocati
    totalGoalsScored, //gol fatti
    totalAssists //assist fatti
};