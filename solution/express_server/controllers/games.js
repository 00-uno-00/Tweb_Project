const ClubGames = require('../models/games'); // Assicurati che il percorso sia corretto

/**
 * Funzione per ottenere le ultime 15 partite giocate rispetto alla data odierna.
 * @returns {Promise} - Una promessa che si risolve con un array delle ultime 15 partite.
 */
function getLast15Games() {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $sort: { date: -1 } // Ordina per data in ordine decrescente
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

/**
 * Funzione per ottenere il punteggio di una partita dato l'ID della partita.
 * @param {String} gameId - ID della partita.
 * @returns {Promise} - Una promessa che si risolve con i dettagli della partita.
 */
function getTeamScores(gameId) {
    return new Promise((resolve, reject) => {
        ClubGames.findOne({game_id: gameId })
            .select('home_club_name away_club_name home_club_goals away_club_goals date') // Seleziona solo i campi necessari
            .then(result => {
                if (result) {
                    const formattedResult = {
                        home_team: result.home_club_name,
                        away_team: result.away_club_name,
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

module.exports = {
    getLast15Games,
    getTeamScores
};