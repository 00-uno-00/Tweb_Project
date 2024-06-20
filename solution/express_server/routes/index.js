var express = require('express');
var router = express.Router();

const appearancesController = require('../controllers/appearances');
const clubGamesController = require('../controllers/club_games');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;

//prova
router.get('/appearances', (req, res) => {
    appearancesController.getAllAppearances()
      .then(appearances => {
        res.status(200).json(appearances);
      })
      .catch(error => {
        res.status(500).json({ error: 'An error occurred while fetching appearances' });
      });
});

// Definizione della route GET per ottenere i giocatori con più cartellini rossi
router.get('/mostredcards', (req, res) => {
    appearancesController.mostRedCards()
        .then(players => {
            res.status(200).json(players);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching players with the most red cards' });
        });
});

// Definizione della route GET per ottenere i giocatori con più cartellini gialli
router.get('/mostyellowcards', (req, res) => {
    appearancesController.mostYellowCards()
        .then(players => {
            res.status(200).json(players);
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching players with the most yellow cards' });
        });
});

/**
 * GET /mostplayedminutes
 * Retrieves the total minutes played by a specific player.
 * @query playerId - The ID of the player for whom to retrieve total minutes played.
 * @returns {Object} - JSON object with total minutes played or an error message.
 */
router.get('/totalplayedminutes', (req, res) => {
    appearancesController.totalMinutesPlayed(38004) // TODO Assuming playerId is passed as a query parameter req.query.playerId (ora me lo sono inventato)
        .then(totalMinutes => {
            res.status(200).json({ totalMinutes }); // Returns total minutes played as JSON
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching total minutes played' });
        });
});

/**
 * GET /totalgoals
 * Retrieves the total goals scored by a specific player.
 * @query playerId - The ID of the player for whom to retrieve total goals scored.
 * @returns {Object} - JSON object with total goals scored or an error message.
 */
router.get('/totalgoals', (req, res) => {
    appearancesController.totalGoalsScored(38004) // TODO Assuming playerId is passed as a query parameter req.query.playerId (ora me lo sono inventato
        .then(totalGoals => {
            res.status(200).json({ totalGoals }); // Returns total goals scored as JSON
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching total goals scored' });
        });
});

/**
 * GET /totalassists
 * Retrieves the total assists made by a specific player.
 * @query playerId - The ID of the player for whom to retrieve total assists.
 * @returns {Object} - JSON object with total assists or an error message.
 */
router.get('/totalassists', (req, res) => {

    appearancesController.totalAssists(38004) //TODO const playerId = req.query.playerId; Assumendo che playerId sia passato come parametro di query
        .then(totalAssists => {
            res.status(200).json({ totalAssists }); // Restituisce il totale degli assist come JSON
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching total assists' });
        });
});


module.exports = router;

//////////////////// file club games //////////////////////

/**
 * GET /totalgoalsbyclub
 * Retrieves the total goals scored by a specific club during all games.
 * @query clubId - The ID of the club for which to retrieve total goals scored.
 * @returns {Object} - JSON object with total goals scored or an error message.
 */
router.get('/totalgoalsbyclub', (req, res) => {
    //const clubId = req.query.clubId; // todo Assumendo che clubId sia passato come parametro di query
    clubGamesController.totalGoalsByClub(431)
        .then(totalGoals => {
            res.status(200).json({ totalGoals }); // Restituisce il totale dei gol segnati come JSON
        })
        .catch(error => {
            res.status(500).json({ error: 'Si è verificato un errore durante il recupero dei gol totali segnati' });
        });
});

/**
 * GET /getmanager
 * Retrieves the manager of a specific club.
 * @query clubId - The ID of the club for which to retrieve the manager's name.
 * @returns {Object} - JSON object with the manager's name or an error message.
 */
router.get('/getmanager', (req, res) => {
    clubGamesController.getManager(83) //todo const club
        .then(managerName => {
            console.log('Manager Name:', managerName); // Stampa per il debug
            if (managerName) {
                res.status(200).json({ managerName }); // Restituisce il nome del manager come JSON
            } else {
                res.status(404).json({ error: 'Manager not found for the specified club ID' });
            }
        })
        .catch(error => {
            res.status(500).json({ error: 'An error occurred while fetching the manager name' });
        });
});
