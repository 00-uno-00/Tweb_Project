var GameEvents = require('../models/games_events');

//restituisce i gol di un giocatore
function totalGoalsByPlayer(playerId) {
    return new Promise((resolve, reject) => {
        GameEvents.countDocuments({ player_id: playerId, type: 'goals' })
            .then(goalCount => {
                resolve(goalCount);
            })
            .catch(error => {
                reject(error);
            });
    });
}

/**
 * Function to get the top 15 players with the most goals.
 * @returns {Promise} - A promise that resolves to an array of players with their total goals.
 */
function top15GoalScorers() {
    return new Promise((resolve, reject) => {
        GameEvents.aggregate([
            {
                $match: { type: 'Goals' } // Considera solo gli eventi di tipo "goal"
            },
            {
                $group: {
                    _id: "$player_id", // Raggruppa per ID del giocatore
                    totalGoals: { $sum: 1 } // Somma i gol
                }
            },
            {
                $sort: { totalGoals: -1 } // Ordina in ordine decrescente per numero di gol
            },
            {
                $limit: 15 // Limita il risultato ai primi 15 giocatori
            },
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
    totalGoalsByPlayer,
    top15GoalScorers
};
