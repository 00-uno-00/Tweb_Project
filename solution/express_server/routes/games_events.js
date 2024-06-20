var express = require('express');
var router = express.Router();
const controller = require('../controllers/games_events');

router.get('/players/top15goalscorers', async function (req, res) {
    try {
        const players = await controller.top15GoalScorers();
        res.status(200).json(players);
    } catch (error) {
        console.error('Error fetching top 15 goal scorers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;