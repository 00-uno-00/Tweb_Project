const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Route handler for fetching the top 15 goal scorers.
 * This endpoint makes a GET request to an external service to retrieve the top 15 goal scorers
 * and returns the data as JSON. If the request to the external service fails, it logs the error
 * and returns a 500 status code with an error message.
 *
 * @route GET /top15
 * @returns {JSON} The list of top 15 goal scorers if successful.
 * @returns {Error} 500 - If there is an error fetching the data from the external service.
 */
router.get('/top15', async (req, res) => {
    let response;
    try {
        response = await axios.get('http://localhost:8080/CTI_Score/getTop15');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top 15 goal scorers:', error);
        res.status(500).json({error: 'Error fetching top 15 goal scorers'});
    }
});

/**
 * Handles GET requests for fetching a player by their ID.
 * It retrieves player information from the Player service and enriches it with championship data
 * from the Championship service based on the player's current club domestic competition ID.
 *
 * @route GET /:id
 * @param {string} req.params.id - The ID of the player to fetch.
 * @returns {Object} The player's information including their championship data if successful.
 * @returns {Error} 500 - If there is an error fetching the player or championship data.
 */
router.get('/:id', async (req, res) => {
    const playerId = req.params.id;

    try {
        const response = await axios.get(`http://localhost:8080/Player/getPlayerById/${playerId}`);

        const championshipPromise = await axios.get(`http://localhost:8080/Championship/getChampionshipById/${response.data.currentClubDomesticCompetitionId}`);
        response.data.championship = championshipPromise.data;
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player: ', error);
        res.status(500).send('Internal server error');
    }
});

/**
 * Handles POST requests for rendering a page specific to a player using their ID.
 * This route is designed to render a server-side template for a specific player.
 *
 * @route POST /specific_Player/:id
 * @param {string} req.params.id - The ID of the player for whom the page is rendered.
 * @returns {HTML} Renders the 'specific_Player' view with the player's ID.
 */
router.post('/specific_Player/:id', function (req, res) {
    res.render('specific_Player', {id: req.params.id})
})

module.exports = router;