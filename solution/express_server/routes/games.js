var express = require('express');
var router = express.Router();
const controller = require("../controllers/games");
const gamesController = require("../controllers/games");

/**
 * Retrieves the latest 15 games from the database.
 * @return {Array} An array of the latest 15 games.
 */
router.get('/latest15matches', async function (req, res) {
    try {
        const matches = await controller.getLast15Games();
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 15 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the latest 10 games of a specific club.
 * @param {Number} id - The id of the club.
 * @return {Array} An array of the latest 10 games of the club.
 *
 */
router.get('/latest10matches/:id', async function (req, res) {
    try {
        const matches = await controller.getLast10Games(parseInt(req.params.id));
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest 10 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the scores of a specific match.
 * @param {Number} id - The id of the match
 * @return {Array} An array of the scores of the match and informations of clubs.
 *
 */
router.get('/teamscores/:id', async function (req, res) {
    try {
        const matches = await controller.getMatchScores(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching score of a match:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the names of the managers of a specific club.
 *
 */

router.get('/getManagerNames/:id', async function (req, res) {
    try {
        const matches = await controller.getManagerNames(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching manager name:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves all games for a specific club (from 2023)
 * @param {Number} id - The id of the club
 * @return {Array} An array of all games of the club.
 */

router.get('/getAllGames/:id', async function (req, res) {
    try {
        const matches = await controller.getAllGames(parseInt(req.params.id));
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the details of a specific game.
 * @param {Number} id - The id of the game
 * @return {Array} An array of the details of the game.
 */
router.get('/getGameDetails/:id', async function (req, res) {
    try {
        const matches = await controller.getGameDetails(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching latest games details:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the games of a specific championship.
 * @param {Number} id - The id of the championship
 * @return {Array} An array of the games of the championship.
 */

router.get('/getGamesByChampionship/:id', async function (req, res) {
    try {
        const matches = await controller.getChampionshipGames(req.params.id);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching games by championship:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves the last 4 matches.
 * @return {Array} An array of the last 4 matches.
 */

router.get('/home/lastMatches', async function (req, res) {
    try {
        const matches = await gamesController.getLast4Matches();
        res.status(200).json(matches);
        console.log(matches);
    } catch (error) {
        console.error('Error fetching last 4 matches:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

/**
 * Retrieves a game.
 * @return {Array} An array of the game.
 *
 */
router.get('/searchGames/', async function (req, res) {
    const searchText = req.query.query;
    const searchArray = searchText.split(' ');

    try {
        const matches = await controller.searchGames(searchArray);
        res.status(200).json(matches);
    } catch (error) {
        console.error('Error fetching match:', error);
        res.status(500).json({error: 'Internal server error'});
    }
});

module.exports = router;