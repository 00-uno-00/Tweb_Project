const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/getAllChampionships', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:8080/Championship/getChampionships`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching championships:', error);
        res.status(500).json({ error: 'Error fetching championships' });
    }
});

router.get('/getAllTeams', async (req, res) => {
    try {
        const response = await axios.get(`http://localhost:8080/Team/getAllTeams`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching players:', error);
        res.status(500).json({ error: 'Error fetching players' });
    }
});

router.get('/getTeam/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const response = await axios.get(`http://localhost:8080/Team/getTeamsByChampionship/${id}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching team:', error);
        res.status(500).json({ error: 'Error fetching team' });
    }
});

router.get('/getChampionship/:name', async (req, res) => {
    const name = req.params.name;
    try {
        const response = await axios.get(`http://localhost:8080/Championship/getChampionshipByName/${name}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching championship:', error);
        res.status(500).json({ error: 'Error fetching championship' });
    }
});

module.exports = router;