const express = require('express');
const axios = require('axios');
const {log} = require("debug");
const router = express.Router();

router.get('/statsMatch/:id', async (req, res) => {
    const id = req.params.id;

    try{
        const data_stadium_promise = axios.get(`http://localhost:3001/api/getGameDetails/${id}`);
        const club_goals_promise = axios.get(`http://localhost:3001/api/teamscores/${id}`);
        const manager_promise = axios.get(`http://localhost:3001/api/getManagerNames/${id}`);

        const data_stadium = await data_stadium_promise;
        const club_goals = await club_goals_promise;
        const manager = await manager_promise;

        res.json({data_stadium: data_stadium.data, club_goals: club_goals.data, manager: manager.data});
    }catch (error) {
        console.error('Error fetching match stats:', error);
        res.status(500).json({error: 'Error fetching match stats'});
    }
});

module.exports = router;
