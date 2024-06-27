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

/*router.get('/game/yellowCards/:gameId/:clubId', (req, res) => {
    const gameId = parseInt(req.params.game_id, 10);
    const clubId = parseInt(req.params.club_id, 10);

    appearancesController.getTeamTotalYellowCards(gameId, clubId)
        .then(yellowCardCount => {
            res.status(200).json({ totalYellowCards: yellowCardCount }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total yellow cards:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total yellow cards' });
        });
});*/

router.get('/game/:gameId/:clubId/redCards', (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const clubId = parseInt(req.params.clubId, 10);
    appearancesController.getTeamTotalRedCards(gameId, clubId)
        .then(redCardCount => {
            res.status(200).json({ totalRedCards: redCardCount }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total red cards:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total red cards' });
        });
});

router.get('/game/:gameId/:clubId/assist', (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    const clubId = parseInt(req.params.clubId, 10);
    appearancesController.getTeamTotalAssists(gameId, clubId)
        .then(assistCount => {
            res.status(200).json({ totalAssist: assistCount }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total assist:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total assist' });
        });
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


module.exports = router;