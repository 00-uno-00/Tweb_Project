/**
 * This module defines the routes for the Teams API.
 * @module routes/Teams
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/teamInfo/:team_id', async (req, res) => {
    const {team_id} = req.params;

    try {
        const [nameResponse, gameStatsResponse] = await Promise.all([
            axios.get(`http://localhost:8080/Team/getTeamById/${team_id}`),
            axios.get(`http://localhost:3001/api/getAllGames/${team_id}`)
        ]);

        const name = nameResponse.data;
        const gameStats = gameStatsResponse.data;

        res.json({name, gameStats});
    } catch (error) {
        console.error('Error fetching the team:', error);
        res.status(500).json({error: 'Error fetching the team'});
    }
});

router.get('/players/:team_id', async (req, res) => {
    const {team_id} = req.params;

    try {
        const {data} = await axios.get(`http://localhost:8080/Player/getPlayersByCurrentClubId/${team_id}`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching the players:', error);
        res.status(500).json({error: 'Error fetching the players'});
    }
});

router.get('/matches/:team_id', async (req, res) => {
    const {team_id} = req.params;

    try {
        const {data} = await axios.get(`http://localhost:3001/api/latest10matches/${team_id}`);
        res.json(data);
    } catch (error) {
        console.error('Error fetching the matches:', error);
        res.status(500).json({error: 'Error fetching the matches'});
    }
});

module.exports = router;
