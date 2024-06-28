var express = require('express');
var router = express.Router();
const controller = require('../controllers/games_events');
const gameEventsController = require("../controllers/games_events");
const appearancesController = require("../controllers/appearances");

router.get('/players/top15goalscorers', async function (req, res) {
    try {
        const players = await controller.top15GoalScorers();
        res.status(200).json(players);
    } catch (error) {
        console.error('Error fetching top 15 goal scorers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/players/:id', async function (req, res) {
    const playerId = req.params.id;

    try {
        const player = await controller.totalGoalsByPlayer(playerId);
        res.status(200).json(player);
    } catch (error) {
        console.error('Error fetching player goals:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/gameevents/:gameId', (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    gameEventsController.getEventsByGameId(gameId)
        .then(events => {
            if (events && events.length > 0) {
                res.status(200).json(events); // Restituisce gli eventi come JSON
            } else {
                res.status(404).json({ error: 'No events found for the specified game ID' });
            }
        })
        .catch(error => {
            console.error('Error fetching game events:', error);
            res.status(500).json({ error: 'An error occurred while fetching the game events' });
        });
});

router.get('/game/assists/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    appearancesController.getTeamTotalAssists(gameId, clubId)
        .then(totalAssists => {
            res.status(200).json({ totalAssists: totalAssists }); // Restituisce il numero totale di assist come JSON
        })
        .catch(error => {
            console.error('Error fetching total assists:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total assists' });
        });
});

router.get('/game/redcards/:gameId/:clubId', (req, res) => {
    const gameId = req.params.gameId;
    const clubId = req.params.clubId;

    appearancesController.getTeamTotalRedCards(gameId, clubId)
        .then(totalRedCards => {
            res.status(200).json({ totalRedCards: totalRedCards }); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total red cards:', error);
            res.status(500).json({ error: 'An error occurred while fetching the total red cards' });
        });
});

module.exports = router;