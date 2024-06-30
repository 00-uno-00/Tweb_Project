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

module.exports = router;