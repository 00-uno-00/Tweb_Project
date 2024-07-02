const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/getChampionship/:id', async (req, res) => {
    const id = req.params.id;
    //TODO fix requests
    try {
        const championshipPromise = axios.get(`http://localhost:8080/Championship/getChampionshipById/${id}`);//gneral championship data
        const teamsPromise = axios.get(`http://localhost:8080/Team/getTeamsByChampionship/${id}`);//teams in championship
        const matchesPromise = axios.get(`http://localhost:3001/api/getGamesByChampionship/${id}`);
        //const topScorersPromise = axios.get(`http://localhost:3001/api/championship/topScorers/${id}`);

        const championship = await championshipPromise;
        const teams = await teamsPromise;
        const matches = await matchesPromise;
        //const topScorers = await topScorersPromise;

        res.json({championship: championship.data, teams: teams.data, matches: matches.data});//, topScorers: topScorers.data
    } catch (error) {
        console.error('Error fetching championship:', error);
        res.status(500).json({error: 'Error fetching championship'});
    }
});

/**
 * Route to get all the teams scores in the championship.
 * @name getTeamsCTI
 * @function
 * @param {list} ids - List of team ids.
 */
router.get('/getTeamsCTIS/:ids', async (req, res) => {
    try {
        const ids = req.params.ids.split(','); // split ids by comma
        const teamsPromises = ids.map(id => axios.get(`http://localhost:8080/Player/getCurrentClubScore/${id}`)); // create a promise for each id
        const teamsResponses = await Promise.all(teamsPromises);
        const teams = teamsResponses.map(response => response.data);
        res.json(teams);
    } catch (error) {
        console.error('Error fetching teams:', error);
        res.status(500).json({error: 'Error fetching teams'});
    }
});

router.get('/getTeam/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const teamPromise = axios.get(`http://localhost:8080/Team/getTeamById/${id}`);
        const team = await teamPromise;
        res.json(team.data);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({error: 'Error fetching team'});
    }
});

module.exports = router;