const Games = require('../models/games'); // Assicurati che il percorso sia corretto

/**
 * Funzione per ottenere le ultime 15 partite giocate rispetto alla data odierna.
 * @returns {Promise} - Una promessa che si risolve con un array delle ultime 15 partite.
 */
function getLast15Games() {
    return new Promise((resolve, reject) => {
        Games.aggregate([
            {
                $sort: {date: -1} // Ordina per data in ordine decrescente
            },
            {
                $limit: 15 // Limita il risultato alle ultime 15 partite
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

function getLast10Games(clubId) {
    return new Promise((resolve, reject) => {
        Games.aggregate([
            {
                $match: {
                    $or: [
                        {home_club_id: clubId},
                        {away_club_id: clubId}
                    ]
                }
            },
            {
                $sort: {date: -1}
            },
            {
                $limit: 10
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

async function getAllGames(id) {
    return new Promise((resolve, reject) => {
        Games.aggregate([
            [
                {
                    $match: {
                        $or:
                            [
                                {home_club_id: id},
                                {away_club_id: id}
                            ]
                    }
                },
                {
                    $match: {
                        date: {
                            '$gte': new Date('Sun, 01 Jan 2023 00:00:00 GMT'),
                            '$lt': new Date('Mon, 01 Jan 2024 00:00:00 GMT')
                        }
                    }
                },
                {
                    $sort: {date: -1}
                }
            ]
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });

}

async function getChampionshipGames(id) {
    return new Promise((resolve, reject) => {
        Games.aggregate([
            {
                $match:
                    {
                        competition_id: id
                    }
            },
            {
                $match: {
                    date: {
                        '$gte': new Date('Sun, 01 Jan 2023 00:00:00 GMT'),
                        '$lt': new Date('Mon, 01 Jan 2024 00:00:00 GMT')
                    }
                }
            },
            {
                $sort: {date: -1}
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
 * Funzione per ottenere il punteggio di una partita dato l'ID della partita.
 * @param {String} gameId - ID della partita.
 * @returns {Promise} - Una promessa che si risolve con i dettagli della partita.
 */
function getTeamScores(gameId) {
    return new Promise((resolve, reject) => {
        Games.findOne({game_id: gameId})
            .select('game_id home_club_name home_club_id away_club_name away_club_id home_club_goals away_club_goals date') // Seleziona solo i campi necessari
            .then(result => {
                if (result) {
                    const formattedResult = {
                        game_id: result.game_id,
                        home_team: result.home_club_name,
                        home_id: result.home_club_id,
                        away_team: result.away_club_name,
                        away_id: result.away_club_id,
                        home_score: result.home_club_goals,
                        away_score: result.away_club_goals,
                        date: result.date
                    };
                    resolve(formattedResult);
                } else {
                    resolve(null); // Se la partita non viene trovata
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Funzione per ottenere i dettagli di una partita dato l'ID della partita.
 * @param {String} gameId - ID della partita.
 * @returns {Promise} - Una promessa che si risolve con i dettagli della partita.
 */
function getGameDetails(gameId) {
    return new Promise((resolve, reject) => {
        Games.findOne({game_id: gameId})
            .select('date stadium') // Seleziona solo i campi necessari
            .then(result => {
                if (result) {
                    const formattedResult = {
                        date: result.date,
                        stadium: result.stadium
                    };
                    resolve(formattedResult);
                } else {
                    resolve(null); // Se la partita non viene trovata
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

/*function clubGoals() {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $group: {
                    _id: "$home_club_name",
                    home_goals: { $sum: "$home_club_goals" }
                }
            },
            {
                $unionWith: {
                    coll: "ClubGames",
                    pipeline: [
                        {
                            $group: {
                                _id: "$away_club_name",
                                away_goals: { $sum: "$away_club_goals" }
                            }
                        }
                    ]
                }
            },
            {
                $group: {
                    _id: "$_id",
                    total_goals: { $sum: { $add: ["$home_goals", "$away_goals"] } }
                }
            },
            {
                $project: {
                    club: "$_id",
                    total_goals: 1,
                    _id: 0
                }
            },
            { $sort: { total_goals: -1 } }
        ])
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}*/

/**
 * Funzione per ottenere i nomi dei manager di ogni squadra.
 * @returns {Promise}
 */

function getManagerNames(gameId) {
    return new Promise((resolve, reject) => {
        Games.findOne({game_id: gameId})
            .select('home_club_manager_name away_club_manager_name') // Seleziona solo i campi necessari
            .then(result => {
                if (result) {
                    const managers = {
                        home_manager: result.home_club_manager_name,
                        away_manager: result.away_club_manager_name
                    };
                    resolve(managers);
                } else {
                    resolve(null); // Se la partita non viene trovata
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

function searchGames(names) {
    names = names.map(name => name.toString());
    if (names.length === 1) names.push("");

    return new Promise((resolve, reject) => {
        Games.aggregate([
            {
                $match: {
                    $or: [
                        {
                            home_club_name: { $regex: names[0], $options: "i" },
                            away_club_name: { $regex: names[1] !== "" ? names[1] : names[0], $options: "i" }
                        },
                        {
                            home_club_name: { $regex: names[1] !== "" ? names[1] : names[0], $options: "i" },
                            away_club_name: { $regex: names[0], $options: "i" }
                        },
                        {
                            home_club_name: { $regex: names[0], $options: "i" }
                        },
                        {
                            away_club_name: { $regex: names[0], $options: "i" }
                        }
                    ]
                }
            },
            {
                $match: {
                    date: {
                        $gte: new Date("Sun, 01 Jan 2023 00:00:00 GMT"),
                        $lt: new Date("Mon, 01 Jan 2024 00:00:00 GMT")
                    }
                }
            },
            {
                $sort: { date: -1 }
            },
            {
                $limit: 10
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
    getLast15Games,
    getLast10Games,
    getTeamScores,
    getGameDetails,
    getAllGames,
    getChampionshipGames,
    searchGames,
    //clubGoals,
    getManagerNames
};