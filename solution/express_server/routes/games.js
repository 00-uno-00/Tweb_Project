var express = require('express');
var router = express.Router();
const controller = require("../controllers/games");
const gamesController = require("../controllers/games");
//todo cambia percorso players
router.get('/latest15matches', async function (req, res) {
    try {
        const matches = await controller.getLast15Games();
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/latest10matches/:id', async function (req, res) {
    try {
        const matches = await controller.getLast10Games(parseInt(req.params.id));
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/teamscores/:id', async function (req, res) {
    try {
        const matches = await controller.getTeamScores(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/getManagerNames/:id', async function (req, res) {
    try {
        const matches = await controller.getManagerNames(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});
//getallgames of a team
router.get('/getAllGames/:id', async function (req, res) {
    try {
        const matches = await controller.getAllGames(parseInt(req.params.id));
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/getGameDetails/:id', async function (req, res) {
    try {
        const matches = await controller.getGameDetails(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/getGamesByChampionship/:id', async function (req, res) {
    try {
        const matches = await controller.getChampionshipGames(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

router.get('/home/lastMatches', async function (req, res) {
    try {
        const matches = await gamesController.getLast4Matches();
        res.status(200).json(matches);
        console.log(matches);
    } catch (error) {
        console.error('Error fetching last 4 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});


router.get('/searchGames/', async function (req, res) {
    const searchText = req.query.query;
    const searchArray = searchText.split(' ');

    try {
        const matches = await controller.searchGames(searchArray);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;