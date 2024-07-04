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
                    _id: "$club_id",
                    totalGoals: {$sum: "$own_goals"}
                }
            },
            {
                $sort: {totalGoals: -1}
            },
            {
                $limit: 15
            },
            {
                $project: {
                    club_id: "$_id",
                    totalGoals: 1
                }
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
 * Retrieves the manager of a specific club.
 * @param {number} clubId - The ID of the club for which to retrieve the manager's name.
 * @returns {Promise} - A promise that resolves with the manager's name or rejects with an error.
 */
function getManager(clubId) {
    return new Promise((resolve, reject) => {
        ClubGames.findOne({club_id: clubId})
            .select("own_manager_name")
            .then(result => {
                if (result) {
                    resolve(result.own_manager_name);
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
 * Retrieves the top 15 clubs with the most wins.
 * @returns {Promise} - A promise that resolves with the top 15 clubs by wins or rejects with an error.
 */

function top15ClubsByWins() {
    return new Promise((resolve, reject) => {
        ClubGames.aggregate([
            {
                $match: {is_win: 1}
            },
            {
                $group: {
                    _id: "$club_id",
                    totalWins: {$sum: 1}
                }
            },
            {
                $sort: {totalWins: -1}
            },
            {
                $limit: 15
            },
            {
                $project: {
                    club_id: "$_id",
                    totalWins: 1
                }
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
    getManager,
    top15ClubsByWins,
    top15ClubsByGoals
};
