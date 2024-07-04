const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/stats/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const [goals, assists, time, redCards, yellowCards] = await Promise.all([
            axios.get(`http://localhost:3001/api/player/totalgoals/${id}`),
            axios.get(`http://localhost:3001/api/player/totalassists/${id}`),
            axios.get(`http://localhost:3001/api/player/totalminutesplayed/${id}`),
            axios.get(`http://localhost:3001/api/player/redCardsAPlayer/${id}`),
            axios.get(`http://localhost:3001/api/player/yellowCardsAPlayer/${id}`)
        ]);

        res.json({
            goals: goals.data,
            assists: assists.data,
            time: time.data,
            redCards: redCards.data,
            yellowCards: yellowCards.data
        });
    } catch (error) {
        console.error('Error fetching player stats:', error);
        res.status(500).json({error: 'Error fetching player stats'});
    }
});

router.get('/career/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const {data} = await axios.get(`http://localhost:3001/api/player/career/${id}`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching player career:', error);
        res.status(500).json({error: 'Error fetching player career'});
    }
});

router.get('/club/:id', async (req, res) => {
    const {id} = req.params;

    try {
        const {data} = await axios.get(`http://localhost:8080/Team/getTeamById/${id}`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching player:', error);
        res.status(500).json({error: 'Error fetching player'});
    }
});

module.exports = router;
