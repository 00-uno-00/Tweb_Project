var GameEvents = require('../models/games_events');

//restituisce i gol di un giocatore
function totalGoalsByPlayer(playerId) {
    return new Promise((resolve, reject) => {
        GameEvents.countDocuments({player_id: playerId, type: 'goals'})
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
                $match: {type: 'Goals'}
            },
            {
                $group: {
                    _id: "$player_id",
                    totalGoals: {$sum: 1}
                }
            },
            {
                $sort: {totalGoals: -1}
            },
            {
                $limit: 15
            },
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
 * Function to get the events of a game by its ID.
 * @param {Number} gameId - ID of the game.
 * @returns {Promise} - A promise that resolves with the events of the game or rejects with an error.
 */
function getEventsByGameId(gameId) {
    return new Promise((resolve, reject) => {
        GameEvents.find({game_id: gameId})
            .select('club_id type player_id description minute')
            .sort({minute: 1})
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}


module.exports = {
    totalGoalsByPlayer,
    top15GoalScorers,
    getEventsByGameId
};
