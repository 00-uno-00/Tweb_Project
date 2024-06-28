var express = require('express');
var router = express.Router();
const controller = require('../controllers/appearances');
const appearancesController = require("../controllers/appearances");

router.get('/player/totalgoals/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalGoalsScored(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player appearances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/player/totalassists/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalAssists(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player appearances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/player/totalminutesplayed/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.totalMinutesPlayed(playerId);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player appearances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/player/yellowCardsAPlayer/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.yellowCardsAPlayer(38004);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player appearances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/player/redCardsAPlayer/:id', async function (req, res) {
    const playerId = parseInt(req.params.id, 10);

    try {
        const appearances = await controller.redCardsAPlayer(38004);
        res.status(200).json(appearances);
    } catch (error) {
        console.error('Error fetching player appearances:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});



router.get('/game/yellowCards/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    appearancesController.getTeamTotalYellowCards(gameId, clubId)
        .then(yellowCardCount => {
            res.status(200).json({ totalYellowCards: yellowCardCount }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total yellow cards:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total yellow cards' });
        });
});

router.get('/game/redcards/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    appearancesController.getTeamTotalRedCards(gameId, clubId)
        .then(totalRedCards => {
            res.status(200).json({ totalRedCards: totalRedCards }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total red cards:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total red cards' });
        });
});

router.get('/game/assists/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    appearancesController.getTeamTotalAssists(gameId, clubId)
        .then(totalAssists => {
            res.status(200).json({ totalAssists: totalAssists }); // Restituisce il numero totale di assist come JSON
        })
        .catch(error => {
            console.error('Error fetching total assists:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total assists' });
        });
});


/**
 * GET /playerappearances/:playerId
 * Restituisce la prima e l'ultima apparizione di un giocatore in ciascuna squadra.
 * @param {Number} playerId - ID del giocatore.
 * @returns {Object} - JSON con le prime e ultime apparizioni per ciascuna squadra.
 */
router.get('/player/career/:playerId', (req, res) => {
    const playerId = parseInt(req.params.playerId, 10);
    appearancesController.getPlayerAppearances(playerId)
        .then(appearances => {
            if (appearances && appearances.length > 0) {
                res.status(200).json(appearances); // Restituisce le apparizioni come JSON
            } else {
                res.status(404).json({ error: 'No appearances found for the specified player ID' });
            }
        })
        .catch(error => {
            console.error('Error fetching player appearances:', error);
            res.status(500).json({ error: 'An error occurred while fetching the player appearances' });
        });
});


module.exports = router;