const express = require('express');
const axios = require('axios');
const router = express.Router();


// GET latest 15 matches
router.get('/latest15matches', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/latest15matches'); //uguale a routes
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching latest 15 matches :', error);
        res.status(500).json({ error: 'Error fetching latest 15 matches' });
    }
});

// GET team scores
router.get('/teamscores', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/teamscores/:id'); //todo
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching team scores :', error);
        res.status(500).json({ error: 'Error fetching team scores' });
    }
});

module.exports = router;