var ClubGames = require('../models/club_games');

/**
 * Retrieves the total goals scored by a specific club during all games.
 * @param {number} clubId - The ID of the club for which to retrieve total goals scored.
 * @returns {Promise} - A promise that resolves with the total goals scored or rejects with an error.
 */
function top15ClubsByGoals() {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $group: {
                    _id: "$club_id", // Raggruppa per ID del club
                    totalGoals: { $sum: "$own_goals" } // Somma i gol del club
                }
            },
            {
                $sort: { totalGoals: -1 } // Ordina in ordine decrescente per numero di gol
            },
            {
                $limit: 15 // Limita il risultato ai primi 15 club
            },
            {
                $project: {
                    club_id: "$_id", // Rinomina _id in club_id
                    totalGoals: 1 // Include totalGoals nel risultato finale
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
 * Retrieves the manager of a specific club.
 * @param {number} clubId - The ID of the club for which to retrieve the manager's name.
 * @returns {Promise} - A promise that resolves with the manager's name or rejects with an error.
 */
function getManager(clubId) {
    return new Promise((resolve, reject) => {
        ClubGames.findOne({ club_id: clubId })
            .select("own_manager_name")
            .then(result => {
                console.log('Manager Name:', managerName); // Stampa per il debug
                if (result) {
                    resolve(result.own_manager_name);
                } else {
                    resolve(null); // Se il club non viene trovato
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}

function top15ClubsByWins() {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $match: { is_win: 1 } // Considera solo le partite vinte
            },
            {
                $group: {
                    _id: "$club_id", // Raggruppa per ID del club
                    totalWins: { $sum: 1 } // Conta le vittorie
                }
            },
            {
                $sort: { totalWins: -1 } // Ordina in ordine decrescente per numero di vittorie
            },
            {
                $limit: 15 // Limita il risultato ai primi 15 club
            },
            {
                $project: {
                    club_id: "$_id", // Rinomina _id in club_id
                    totalWins: 1 // Include totalWins nel risultato finale
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



module.exports = {
    getManager,
    top15ClubsByWins,
    top15ClubsByGoals
};
