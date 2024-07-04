const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Route to get detailed statistics for a specific player by ID.
 *
 * @route GET /stats/:id
 * @param {string} req.params.id - The ID of the player whose stats are being requested.
 * @returns {JSON} An object containing the player's goals, assists, total minutes played, red cards, and yellow cards.
 * @returns {Error} 500 - If there is an error fetching the player stats.
 */

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

/**
 * Route to get detailed career information for a specific player by ID.
 *
 * @route GET /career/:id
 * @param {string} req.params.id - The ID of the player whose career information is being requested.
 * @returns {JSON} The player's career information.
 * @returns {Error} 500 - If there is an error fetching the player's career information.
 */

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

/**
 * Route to get detailed club information for a specific player by ID
 *
 * @route GET /club/:id
 * @param {string} req.params.id - The ID of the player whose club information is being requested.
 * @returns {JSON} The player's club information.
 * @returns {Error} 500 - If there is an error fetching the player's club information.
 */

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
