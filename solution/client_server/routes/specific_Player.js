const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/stats/:id', async (req, res) => {
    const id = req.params.id;
    const goalsPromise = axios.get(`http://localhost:3001/api/player/totalgoals/${id}`);
    const assistsPromise = axios.get(`http://localhost:3001/api/player/totalassists/${id}`);
    const timePromise = axios.get(`http://localhost:3001/api/player/totalminutesplayed/${id}`);

    try {
        const goals = await goalsPromise;
        const assists = await assistsPromise;
        const time = await timePromise;

        res.json({goals: goals.data, assists: assists.data, time: time.data});
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({error: 'Error fetching player stats'});
    }
});

module.exports = router;