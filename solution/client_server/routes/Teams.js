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
        const response = await axios.get('http://localhost:8080/Team/getAllTeams');
        teams = response.data;
    } catch (error) {
        console.error('Error fetching all the teams', error);
        res.status(500).json({error: 'Error fetching all the teams'});
    }

    // Get the ids of the players in the team
    for (const team of teams) {
        try {
            const response = await axios.get(`http://localhost:8080/Player/getPlayersByCurrentClubId/${team._id}`);
            getTeamScore(response.data)
                .then(teamScore => {
                    team.teamScore = teamScore;
                })
                .catch(error => {
                    console.error('Error fetching team score: ', error);
                    res.status(500).send('Internal server error');
                });
        } catch (error) {
            console.error('Error fetching team: ', error);
            res.status(500).send('Internal server error');
        }
    }
});

/**
 * Function to calculate the team score.
 * It fetches the score for a list of players and adds it to the team score.
 * @param {Array} players - The list of players in the team.
 * @returns {number} The team score.
 */
async function getTeamScore(players) {
    let teamScore = 0;

    try {
        const response = await axios.get(`http://localhost:8080/CTI_Score/getScoreByList/${players}`);
        teamScore += response.data.totalGoals;
    } catch (error) {
        console.error('Error fetching player: ', error);
        res.status(500).send('Internal server error');
    }

    return teamScore;
}

module.exports = router;