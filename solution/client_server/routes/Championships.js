const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Get all championships from the server
 */

router.get('/getTop10', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:8080/Championship/getFirstTierChampionships');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top 10 championships:', error);
        res.status(500).json({error: 'Error fetching top 10 championships'});
    }
});

module.exports = router;