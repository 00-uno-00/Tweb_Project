/**
 * This module defines the routes for the Teams API.
 * @module routes/Teams
 */

const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Route to get the top 15 teams.
 * It fetches all the teams from the database, then for each team,
 * it fetches the players in the team and calculates the team score.
 * @name get/top15Teams
 * @function
 * @param {string} path - Express path
 * @param {callback} middleware - Express middleware.
 */
router.get('/top15Teams', async (req, res) => {

    let teams = [];

    // Get all the teams id from db
    try {
        const response = await axios.get('http://localhost:8080/Team/getActiveTeams');
        teams = response.data;
    } catch (error) {
        console.error('Error fetching all the teams', error);
        res.status(500).json({error: 'Error fetching all the teams'});
    }
    const scores = [];
    // Get the ids of the players in the team
    const teamPromises = teams.map( team => axios.get(`http://localhost:8080/Player/getCurrentClubScore/${team.id}`));
    const teamResponses = await Promise.all(teamPromises);
    for (let i = 0; i < teams.length; i++) {
        scores.push({
            name: teams[i].name,
            score: teamResponses[i].data,
            id: teams[i].id
        });
    }
    // Sort the teams by score
    scores.sort((a, b) => b.score - a.score);
    res.json(scores);
});

module.exports = router;