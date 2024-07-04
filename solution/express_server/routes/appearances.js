var express = require('express');
var router = express.Router();
const controller = require('../controllers/appearances');

/**
 * Retrieves the total goals scored by a specific player during all games.
 * @param {number} playerId - The ID of the player for which to retrieve total goals scored.
 * @returns {Promise} - A promise that resolves with the total goals scored by the player.
 */
router.get('/player/totalgoals/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalGoalsScored(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player goals scored:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the total assists made by a specific player during all games.
 * @param {number} playerId - The ID of the player for which to retrieve total assists made.
 * @returns {Promise} - A promise that resolves with the total assists made by the player.
 */
router.get('/player/totalassists/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalAssists(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player assists:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the total minutes played by a specific player during all games.
 * @param {number} playerId - The ID of the player for which to retrieve total minutes played.
 * @returns {Promise} - A promise that resolves with the total minutes played by the player.
 */

router.get('/player/totalminutesplayed/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalMinutesPlayed(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player minutes played:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the total yellow cards received by a specific player during a specific game.
 * @param {number} playerId - The ID of the player for which to retrieve total yellow cards received.
 * @param {number} gameId - The ID of the game for which to retrieve total yellow cards received.
 * @returns {Promise} - A promise that resolves with the total yellow cards received by the player during the game.
 */

router.get('/game/yellowCards/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    controller.getTeamTotalYellowCards(gameId, clubId)
        .then(yellowCardCount => {
            res.status(200).json({totalYellowCards: yellowCardCount});
        })
        .catch(error => {
            console.error('Error fetching total yellow cards:', error);
            res.status(500).json({error: 'An error occurred while fetching the total yellow cards'});
        });
});

/**
 * Retrieves the total red cards received by a specific player during a specific game.
 * @param {number} playerId - The ID of the player for which to retrieve total red cards received.
 * @param {number} gameId - The ID of the game for which to retrieve total red cards received.
 * @returns {Promise} - A promise that resolves with the total red cards received by the player during the game.
 */

router.get('/game/redcards/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    controller.getTeamTotalRedCards(gameId, clubId)
        .then(totalRedCards => {
            res.status(200).json({totalRedCards: totalRedCards});
        })
        .catch(error => {
            console.error('Error fetching total red cards:', error);
            res.status(500).json({error: 'An error occurred while fetching the total red cards'});
        });
});

/**
 * Retrieves the total assists made by a specific player during a specific game.
 * @param {number} playerId - The ID of the player.
 * @param {number} gameId - The ID of the game.
 * @returns {Promise} - A promise that resolves with the total assists made by the player during the game.
 */
router.get('/game/assists/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    controller.getTeamTotalAssists(gameId, clubId)
        .then(totalAssists => {
            res.status(200).json({totalAssists: totalAssists});
        })
        .catch(error => {
            console.error('Error fetching total assists:', error);
            res.status(500).json({error: 'An error occurred while fetching the total assists'});
        });
});

/**
    * Retrieves the first and last appearance of a specific player for each club.
    * @param {number} playerId - The ID of the player for which to retrieve the first and last appearance.
    */
router.get('/player/career/:playerId', (req, res) => {
    const playerId = parseInt(req.params.playerId, 10);
    controller.getPlayerAppearances(playerId)
        .then(appearances => {
            if (appearances && appearances.length > 0) {
                res.status(200).json(appearances);
            } else {
                res.status(404).json({error: 'No appearances found for the specified player ID'});
            }
        })
        .catch(error => {
            console.error('Error fetching player career:', error);
            res.status(500).json({error: 'An error occurred while fetching the player career'});
        });
});

/**
 * Retrieves the top 8 goal scorers.
 * @returns {Promise} - A promise that resolves with the top 8 goal scorers.
 */
router.get('/home/topPlayer', (req, res) => {
    controller.top8GoalScorers()
        .then(appearances => {
            if (appearances && appearances.length > 0) {
                res.status(200).json(appearances);
            } else {
                res.status(404).json({error: 'No players found'});
            }
        })
        .catch(error => {
            console.error('Error fetching top 8 players:', error);
            res.status(500).json({error: 'An error occurred while fetching top 8 players'});
        });
});


module.exports = router;