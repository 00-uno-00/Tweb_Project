const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/stats/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const goalsPromise = axios.get(`http://localhost:3001/api/player/totalgoals/${id}`);
        const assistsPromise = axios.get(`http://localhost:3001/api/player/totalassists/${id}`);
        const timePromise = axios.get(`http://localhost:3001/api/player/totalminutesplayed/${id}`);
        const redCardsPromise = axios.get(`http://localhost:3001/api/player/redCardsAPlayer/${id}`);
        const yellowCardsPromise = axios.get(`http://localhost:3001/api/player/yellowCardsAPlayer/${id}`);

        const goals = await goalsPromise;
        const assists = await assistsPromise;
        const time = await timePromise;
        const redCards = await redCardsPromise;
        const yellowCards = await yellowCardsPromise;

        res.json({goals: goals.data, assists: assists.data, time: time.data, redCards: redCards.data, yellowCards: yellowCards.data});
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({error: 'Error fetching player stats'});
    }
});

router.get('/career/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await axios.get(`http://localhost:3001/api/player/career/${id}`);


        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player career:', error);
        res.status(500).json({error: 'Error fetching player career'});
    }
});

router.get('/club/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const response = await axios.get(`http://localhost:8080/Team/getTeamById/${id}`);

        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({error: 'Error fetching player'});
    }
});

module.exports = router;