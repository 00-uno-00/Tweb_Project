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
        Games.find({})
            .sort({ date: -1 }) // Ordina per data in ordine decrescente
            .limit(4) // Limita a 4 risultati
            .then(results => {
                const lastFourGames = results.map(game => ({
                    home_club_name: game.home_club_name,
                    away_club_name: game.away_club_name,
                    home_club_goals: game.home_club_goals,
                    away_club_goals: game.away_club_goals
                }));
                resolve(lastFourGames);
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


async function getLast4Matches() {
        return new Promise((resolve, reject) => {
            Games.find({
                home_club_goals: { $exists: true },
                away_club_goals: { $exists: true },
                home_club_name: { $exists: true, $ne: "", $gt: 1 },
                away_club_name: { $exists: true, $ne: "", $gt: 1 }
            })
                .sort({ date: -1 }) // Ordina per data in ordine decrescente
                .limit(4) // Limita a 4 risultati
                .then(results => {
                    // Se abbiamo meno di 4 risultati, proviamo a prendere più risultati fino a 4
                    if (results.length < 4) {
                        return Games.find({
                            home_club_goals: { $exists: true },
                            away_club_goals: { $exists: true },
                            home_club_name: { $exists: true, $ne: "", $gt: 1 },
                            away_club_name: { $exists: true, $ne: "", $gt: 1 },
                            date: { $lt: results[results.length - 1].date } // Utilizza l'ultima data trovata come limite superiore
                        })
                            .sort({ date: -1 })
                            .limit(4 - results.length)
                            .then(additionalResults => {
                                results.push(...additionalResults);
                                return results;
                            });
                    } else {
                        return results;
                    }
                })
                .then(results => {
                    const validGames = results.filter(game => {
                        return game.home_club_name.length > 1 && game.away_club_name.length > 1;
                    });

                    const lastFourGames = validGames.slice(0, 4).map(game => ({
                        home_club_name: game.home_club_name,
                        away_club_name: game.away_club_name,
                        home_club_goals: game.home_club_goals,
                        away_club_goals: game.away_club_goals
                    }));

                    resolve(lastFourGames);
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
    getManagerNames,
    getLast4Matches
};