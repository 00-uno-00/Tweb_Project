var express = require('express');
var router = express.Router();
const controller = require("../controllers/games");
//todo cambia percorso players
router.get('/latest15matches', async function (req, res) {
    try {
        const matches = await controller.getLast15Games();
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/teamscores/:id', async function (req, res) {
    try {
        const matches = await controller.getTeamScores(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;