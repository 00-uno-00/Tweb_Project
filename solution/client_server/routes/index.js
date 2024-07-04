var express = require('express');
const {join} = require("path");
const axios = require('axios');
const {json} = require("express");
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.get('/Players', function (req, res) {
    res.render('Players')
})

router.get('/specific_Player/:id', function (req, res) {
    res.render('specific_Player', {id: req.params.id})
})

router.get('/Teams', function (req, res) {
    res.render('Teams')
})

router.get('/Team/:id', function (req, res) {
    res.render('Team', {id: req.params.id})
})

router.get('/Matches', function (req, res) {
    res.render('Matches')
})

router.get('/Championships', function (req, res) {
    res.render('Championships')
})

router.get('/specific_Championship/:id', function (req, res) {
    res.render('Championship', {id: req.params.id})
})

router.get('/chat1', function (req, res) {
    res.render('chat1')
})

router.get('/Info', function (req, res) {
    res.render('Info')
})

router.get('/Match/:id', function (req, res) {
    res.render('Match', {id: req.params.id})
})

// GET top 8 players most goals scored
router.get('/topPlayer', async (req, res) => {

    try {
        response = await axios.get('http://localhost:3001/api/home/topPlayer');
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top 8 players:', error);
        res.status(500).json({error: 'Error fetching top 8 players'});
    }
});

router.get('/lastMatches', async (req, res) => {

    try {
        response = await axios.get('http://localhost:3001/api/home/lastMatches');
        console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching last matches:', error);
        res.status(500).json({error: 'Error fetching last matches'});
    }
});

router.get('/getPlayerName/:id', async (req, res) => {
    const playerId = req.params.id;
    try {
        response = await axios.get(`http://localhost:8080/Player/getPlayerById/${playerId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({error: 'Error fetching player'});
    }
});

router.get('/getDataStats', async (req, res) => {
    try {
        const playerPromise = axios.get('http://localhost:8080/Player/getNumberOfPlayers');
        const teamPromise = axios.get('http://localhost:8080/Team/getNumberOfTeams');
        const championshipPromise = axios.get('http://localhost:8080/Championship/getNumberOfChampionships');

        const[players, teams, championships] = await Promise.all([playerPromise, teamPromise, championshipPromise]);

        res.json({
            players: players.data,
            teams: teams.data,
            championships: championships.data
        });
    } catch (error) {
        console.error('Error fetching data stats:', error);
        res.status(500).json({error: 'Error fetching data stats'});
    }
});

module.exports = router;