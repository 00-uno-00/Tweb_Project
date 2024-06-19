var ClubGames = require('../models/club_games');

/**
 * Retrieves the total goals scored by a specific club during all games.
 * @param {number} clubId - The ID of the club for which to retrieve total goals scored.
 * @returns {Promise} - A promise that resolves with the total goals scored or rejects with an error.
 */
function totalGoalsByClub(clubId) {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $match: { club_id: clubId }
            },
            {
                $group: {
                    _id: null,
                    totalGoals: { $sum: "$own_goals" }
                }
            }
        ])
            .then(results => {
                if (results.length > 0) {
                    resolve(results[0].totalGoals);
                } else {
                    resolve(0); // Se il club non ha segnato nessun gol
                }
            })
            .catch(error => {
                reject(error);
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


module.exports = {
    totalGoalsByClub,
    getManager
};
