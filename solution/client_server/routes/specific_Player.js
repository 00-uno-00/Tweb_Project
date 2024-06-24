const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/stats/:id', async (req, res) => {
    const id = req.params.id;
    const goalsPromise = axios.get(`http://localhost:3001/api/player/totalgoals/${id}`);
    const assistsPromise = axios.get(`http://localhost:3001/api/player/totalassists/${id}`);
    const timePromise = axios.get(`http://localhost:3001/api/player/totalminutesplayed/${id}`);
    const redCardsPromise = axios.get(`http://localhost:3001/api/player/redCardAPlayer/${id}`);
    const yellowCardsPromise = axios.get(`http://localhost:3001/api/player/yellowCardAPlayer/${id}`);

    try {
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

module.exports = router;