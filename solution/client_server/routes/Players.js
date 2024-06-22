const express = require('express');
const axios = require('axios');
const router = express.Router();


// GET top 15 goal scorers
router.get('/top15goalscorers', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3001/api/players/top15goalscorers');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching top 15 goal scorers:', error);
        res.status(500).json({ error: 'Error fetching top 15 goal scorers' });
    }
});


router.get('/:id', async (req, res) => {
    const playerId = req.params.id;

    try{
        const response = await axios.get(`http://localhost:8080/Player/getPlayerById/${playerId}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching player: ', error);
        res.status(500).send('Internal server error');
    }
});

router.post('/specific_Player/:id', function (req, res) {
    res.render('specific_Player', {id: req.params.id})
})

module.exports = router;