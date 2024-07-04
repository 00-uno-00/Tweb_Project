const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

/**
 * Route to get detailed statistics for a specific match by ID.
 * This includes stadium data, club goals, and game events.
 *
 * @route GET /statsMatch/:id
 * @param {string} req.params.id - The ID of the match to fetch statistics for.
 * @returns {Object} An object containing data about the stadium, club goals, and events of the match.
 * @returns {Error} 500 - If there is an error fetching any of the match details.
 */

router.get('/statsMatch/:id', async (req, res) => {
    const id = req.params.id;
    let data_stadium, club_goals;
    let events;
    // Try fetching game details
    try {
        const data_stadium_promise = axios.get(`http://localhost:3001/api/getGameDetails/${id}`);
        data_stadium = await data_stadium_promise;
    } catch (error) {
        console.error('Error fetching game details:', error);
        return res.status(500).json({error: 'Error fetching game details'});
    }

    try {
        const club_goals_promise = axios.get(`http://localhost:3001/api/teamscores/${id}`);
        club_goals = await club_goals_promise;
    } catch (error) {
        console.error('Error fetching team scores:', error);
        return res.status(500).json({error: 'Error fetching team scores'});
    }

    try {
        const events_promise = axios.get(`http://localhost:3001/api/gameevents/${id}`);
        events = await events_promise;
    } catch (error) {
        console.error('Error fetching game events:', error);
        return res.status(500).json({error: 'Error fetching game events'});
    }

    // Send the combined results
    res.json({
        data_stadium: data_stadium.data,
        club_goals: club_goals.data,
        events: events.data
    });
});

/**
 * Route to get comprehensive statistics for a specific game and club by their IDs.
 * This includes manager name, yellow cards, red cards, and assists data.
 *
 * @route GET /statsMatch/totalinfo/:gameId/:clubId
 * @param {string} req.params.gameId - The ID of the game.
 * @param {string} req.params.clubId - The ID of the club.
 * @returns {Object} An object containing the manager's name, yellow cards, red cards, and assists data.
 * @returns {Error} 500 - If there is an error fetching any of the data.
 */

router.get('/statsMatch/totalinfo/:gameId/:clubId', async (req, res) => {
    const team_id = req.params.clubId;
    const game_id = req.params.gameId;

    try {
        // Create promises for all requests
        const managerPromise = axios.get(`http://localhost:3001/api/getManagerNames/${game_id}`);
        const yellowCardPromise = axios.get(`http://localhost:3001/api/game/yellowCards/${game_id}/${team_id}`);
        const redCardPromise = axios.get(`http://localhost:3001/api/game/redcards/${game_id}/${team_id}`);
        const assistsPromise = axios.get(`http://localhost:3001/api/game/assists/${game_id}/${team_id}`);

        // Wait for all promises to resolve
        const [manager, yellowCard, redCard, assists] = await Promise.all([
            managerPromise,
            yellowCardPromise,
            redCardPromise,
            assistsPromise
        ]);

        // Send the response with all data
        res.json({
            yellow_Card: yellowCard.data,
            red_Card: redCard.data,
            manager: manager.data,
            assists: assists.data
        });

        console.log(manager.data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({error: 'Error fetching data'});
    }
});


router.get('/')

module.exports = router;
