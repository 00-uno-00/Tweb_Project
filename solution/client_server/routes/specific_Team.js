/**
 * This module defines the routes for the Teams API.
 * @module routes/Teams
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Route to get detailed information for a specific team by ID.
 *
 * @route GET /teamInfo/:team_id
 * @param {string} req.params.team_id - The ID of the team whose information is being requested.
 * @returns {JSON} An object containing the team's name and game statistics.
 * @returns {Error} 500 - If there is an error fetching the team information.
 */

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

/**
 * Route to get all the players in a specific team by ID.
 *
 * @route GET /players/:team_id
 * @param {string} req.params.team_id - The ID of the team whose players are being requested.
 * @returns {JSON} A list of players belonging to the team.
 * @returns {Error} 500 - If there is an error fetching the players.
 */

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

/**
 * Route to get the latest 10 matches of a specific team by ID.
 *
 * @route GET /matches/:team_id
 * @param {string} req.params.team_id - The ID of the team whose latest matches are being requested.
 * @returns {JSON} A list of the latest 10 matches of the team.
 * @returns {Error} 500 - If there is an error fetching the matches.
 */

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
