var express = require('express');
var router = express.Router();

const appearancesController = require('../controllers/appearances');
const clubGamesController = require('../controllers/club_games');
const gameEventsController = require('../controllers/games_events');
const gamesController = require('../controllers/games');
const controller = require("../controllers/games");

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', {title: 'Express'});
});

router.get('/appearances', (req, res) => {
    appearancesController.getAllAppearances()
        .then(appearances => {
            res.status(200).json(appearances);
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching appearances'});
        });
});


router.get('/mostredcards', (req, res) => {
    appearancesController.mostRedCards()
        .then(players => {
            res.status(200).json(players);
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching players with the most red cards'});
        });
});

router.get('/mostyellowcards', (req, res) => {
    appearancesController.mostYellowCards()
        .then(players => {
            res.status(200).json(players);
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching players with the most yellow cards'});
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
            res.status(200).json({totalMinutes});
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching total minutes played'});
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
            res.status(200).json({totalGoals});
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching total goals scored'});
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
            res.status(200).json({totalAssists}); // Restituisce il totale degli assist come JSON
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching total assists'});
        });
});

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
            res.status(200).json({totalGoals});
        })
        .catch(error => {
            res.status(500).json({error: 'Si è verificato un errore durante il recupero dei gol totali segnati'});
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
            console.log('Manager Name:', managerName);
            if (managerName) {
                res.status(200).json({managerName});
            } else {
                res.status(404).json({error: 'Manager not found for the specified club ID'});
            }
        })
        .catch(error => {
            res.status(500).json({error: 'An error occurred while fetching the manager name'});
        });
});

/**
 * GET /top15clubsbywins
 * Restituisce le prime 15 squadre con il maggior numero di vittorie.
 * @returns {Object} - JSON con l'ID del club e il totale delle vittorie
 */
router.get('/top15clubsbywins', (req, res) => {
    clubGamesController.top15ClubsByWins()
        .then(clubs => {
            console.log(clubs);
            res.status(200).json(clubs);
        })
        .catch(error => {
            console.error('Error fetching top 15 clubs by wins:', error);
            res.status(500).json({error: 'An error occurred while fetching the top 15 clubs by wins'});
        });
});


/**
 * GET /top15goalscorers
 * Restituisce i primi 15 giocatori con il maggior numero di gol.
 * @returns {Object} - JSON con l'ID del giocatore e il totale dei gol
 */
router.get('/top15goalscorers', (req, res) => {
    gameEventsController.top15GoalScorers()
        .then(players => {
            console.log(players);
            res.status(200).json(players);
        })
        .catch(error => {
            console.error('Error fetching top 15 goal scorers:', error);
            res.status(500).json({error: 'An error occurred while fetching the top 15 goal scorers'});
        });
});

router.get('/redCardsAPlayer', (req, res) => {
    appearancesController.redCardsAPlayer(38253)
        .then(players => {
            console.log(players);
            res.status(200).json(players);
        })
        .catch(error => {
            console.error('Error fetching top 15 goal scorers:', error);
            res.status(500).json({error: 'An error occurred while fetching the top 15 goal scorers'});
        });
});

router.get('/yellowCardsAPlayer/:id', (req, res) => {
    const playerId = req.params.id;
    console.log(playerId);
    appearancesController.yellowCardsAPlayer(playerId)
        .then(players => {
            console.log(players);
            res.status(200).json(players);
        })
        .catch(error => {
            console.error('Error fetching top 15 goal scorers:', error);
            res.status(500).json({error: 'An error occurred while fetching the top 15 goal scorers'});
        });
});
/**
 * GET /last15games
 * Restituisce le ultime 15 partite giocate rispetto alla data odierna.
 * @returns {Object} - JSON con le ultime 15 partite.
 */
router.get('/last15games', (req, res) => {
    gamesController.getLast15Games()
        .then(games => {
            res.status(200).json(games);
        })
        .catch(error => {
            console.error('Error fetching last 15 games:', error);
            res.status(500).json({error: 'An error occurred while fetching the last 15 games'});
        });
});

/**
 * GET /teamscores/:gamesID
 * Restituisce il punteggio della squadra e della squadra avversaria per una data squadra.
 * @param {Number} clubId - ID della squadra.
 * @returns {Object} - JSON con i punteggi delle partite.
 */
router.get('/teamscores/:gamesID', (req, res) => {
    const gamesID = req.params.id;
    gamesController.getTeamScores(gamesID)
        .then(scores => {
            res.status(200).json(scores);
        })
        .catch(error => {
            console.error('Error fetching team scores:', error);
            res.status(500).json({error: 'An error occurred while fetching the team scores'});
        });
});


router.get('/game/:gameId/redcards', (req, res) => {
    const gameId = parseInt(req.params.gameId, 10);
    appearancesController.getTotalRedCards(gameId)
        .then(redCardCount => {
            res.status(200).json({totalRedCards: redCardCount}); // Restituisce il numero totale di cartellini rossi come JSON
        })
        .catch(error => {
            console.error('Error fetching total red cards:', error);
            res.status(500).json({error: 'An error occurred while fetching the total red cards'});
        });
})

module.exports = router;