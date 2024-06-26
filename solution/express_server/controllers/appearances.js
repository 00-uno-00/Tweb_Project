var Appearances = require('../models/appearances');

//prova
function getAllAppearances() {
    return new Promise((resolve, reject) => {
        Appearances.find({appearance_id:'2233748_79232'})
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
        Appearances.aggregate([
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
        Appearances.aggregate([
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
        Appearances.aggregate([
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
        Appearances.aggregate([
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

async function redCardsAPlayer(playerId) {
    try {
        const results = await Appearances.aggregate([
            {
                $match: { player_id: playerId }
            },
            {
                $group: {
                    _id: "$player_id",
                    player_name: { $first: "$player_name" },
                    red_cards: { $sum: "$red_cards" }
                }
            }
        ]);

        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}

async function yellowCardsAPlayer(playerId) {
    try {
        const results = await Appearances.aggregate([
            {
                $match: { player_id: playerId }
            },
            {
                $group: {
                    _id: "$player_id",
                    player_name: { $first: "$player_name" },
                    red_cards: { $sum: "$yellow_cards" }
                }
            }
        ]);

        if (results.length > 0) {
            return results[0];
        } else {
            return null;
        }
    } catch (error) {
        throw error;
    }
}


/**
 * Funzione per ottenere la prima e l'ultima apparizione di un giocatore in ciascuna squadra.
 * @param {Number} playerId - ID del giocatore.
 * @returns {Promise} - Una promessa che si risolve con le prime e ultime apparizioni per ciascuna squadra.
 */
function getPlayerAppearances(playerId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            {
                $match: { player_id: playerId } // Filtra per ID del giocatore
            },
            {
                $group: {
                    _id: "$player_club_id", // Raggruppa per ID del club
                    firstAppearance: { $min: "$date" }, // Trova la data della prima apparizione
                    lastAppearance: { $max: "$date" }, // Trova la data dell'ultima apparizione
                    player_name: { $first: "$player_name" } // Mantiene il nome del giocatore
                }
            },
            {
                $project: {
                    _id: 0, // Escludi l'_id
                    club_id: "$_id", // Rinominare _id in club_id
                    player_name: 1, // Includi il nome del giocatore
                    firstAppearance: 1, // Includi la prima apparizione
                    lastAppearance: 1 // Includi l'ultima apparizione
                }
            }
        ])
            .then(results => {
                resolve(results); // Risolvi con i risultati dell'aggregazione
            })
            .catch(error => {
                reject(error); // Rifiuta in caso di errore
            });
    });
}


/**
 * Funzione per ottenere il numero totale di cartellini rossi in una partita dato il suo ID.
 * @param {Number} gameId - ID della partita.
 * @returns {Promise} - Una promessa che si risolve con il numero totale di cartellini rossi.
 */
function getTotalRedCards(gameId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            { $match: { game_id: gameId } },
            { $group: { _id: null, totalRedCards: { $sum: "$red_cards" } } }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalRedCards); // Risolvi con il numero totale di cartellini rossi
                } else {
                    resolve(0); // Se non ci sono cartellini rossi, restituisci 0
                }
            })
            .catch(error => {
                reject(error); // Rifiuta in caso di errore
            });
    });
}

function getTotalYellowCards(gameId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            { $match: { game_id: gameId } },
            { $group: { _id: null, totalRedCards: { $sum: "$Yellow_cards" } } }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalRedCards); // Risolvi con il numero totale di cartellini rossi
                } else {
                    resolve(0); // Se non ci sono cartellini rossi, restituisci 0
                }
            })
            .catch(error => {
                reject(error); // Rifiuta in caso di errore
            });
    });
}

function getTotalAssists(gameId) {
    return new Promise((resolve, reject) => {
        Appearances.aggregate([
            { $match: { game_id: gameId } },
            { $group: { _id: null, totalAssists: { $sum: "$assists" } } }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalAssists); // Risolvi con il numero totale di assist
                } else {
                    resolve(0); // Se non ci sono assist, restituisci 0
                }
            })
            .catch(error => {
                reject(error); // Rifiuta in caso di errore
            });
    });
}


module.exports = {
    getAllAppearances, //prova
    mostRedCards, //giocatori con più cartellini rossi
    mostYellowCards, //giocatori con più cartellini gialli
    totalMinutesPlayed, //minuti giocati
    totalGoalsScored, //gol fatti
    totalAssists, //assist fatti
    redCardsAPlayer, //cartellini rossi fatti da un giocatore
    yellowCardsAPlayer, //cartellini gialli fatti da un giocatore
    getPlayerAppearances, //prima e ultima apparizione di un giocatore in ciascuna squadra
    getTotalRedCards, //numero totale di cartellini rossi in una partita
    getTotalYellowCards, //numero totale di cartellini gialli in una partita
    getTotalAssists //numero totale di assist in una partita
};