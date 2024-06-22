var express = require('express');
var router = express.Router();
const controller = require('../controllers/appearances');

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
        const appearances = await controller.totalAssists(38004);
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

module.exports = router;