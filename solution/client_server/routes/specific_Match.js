const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/statsMatch/:id', async (req, res) => {
    const id = req.params.id;
    let data_stadium, club_goals, manager;
    let events;
        // Try fetching game details
        try {
            const data_stadium_promise = axios.get(`http://localhost:3001/api/getGameDetails/${id}`);
            data_stadium = await data_stadium_promise;
        } catch (error) {
            console.error('Error fetching game details:', error);
            return res.status(500).json({ error: 'Error fetching game details' });
        }

        // Try fetching team scores
        try {
            const club_goals_promise = axios.get(`http://localhost:3001/api/teamscores/${id}`);
            club_goals = await club_goals_promise;
        } catch (error) {
            console.error('Error fetching team scores:', error);
            return res.status(500).json({ error: 'Error fetching team scores' });
        }

        // Try fetching manager names
        try {
            const manager_promise = axios.get(`http://localhost:3001/api/getManagerNames/${id}`);
            manager = await manager_promise;
        } catch (error) {
            console.error('Error fetching manager names:', error);
            return res.status(500).json({ error: 'Error fetching manager names' });
        }

        try{
            const events_promise = axios.get(`http://localhost:3001/api/gameevents/${id}`);
            events = await events_promise;
        } catch (error) {
            console.error('Error fetching game events:', error);
            return res.status(500).json({ error: 'Error fetching game events' });
        }

        // Send the combined results
        res.json({
            data_stadium: data_stadium.data,
            club_goals: club_goals.data,
            manager: manager.data,
            events: events.data
        });
    });

router.get('/')
module.exports = router;
