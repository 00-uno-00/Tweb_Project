const express = require('express');
const axios = require('axios');
const router = express.Router();

/**
 * Searches for players based on a query string and returns a combined response from different databases.
 * Currently, it only fetches data from a PostgreSQL database.
 *
 * @route GET /Players
 * @param {string} req.query.query - The search query for player names.
 * @returns {JSON} An object containing arrays of players from PostgreSQL and MongoDB (MongoDB part is not implemented yet).
 */
router.get('/Players', async (req, res) => {
    try {
        const searchText = req.query.query;

        const playersPromise = axios.get('http://localhost:8080/Player/search', {params: {query: searchText}});

        const [playersResponse, clubsResponse] = await Promise.all([playersPromise]);

        const response = {
            postgres: playersResponse.data,
            mongo: []
        };

        res.json(response);
    } catch (error) {
        console.error('Error in search: ', error);
        res.status(500).send('Internal server error');
    }
});

/**
 * Searches for teams based on a query string and returns a combined response from different databases.
 * Currently, it only fetches data from a PostgreSQL database.
 *
 * @route GET /Teams
 * @param {string} req.query.query - The search query for team names.
 * @returns {JSON} An object containing arrays of teams from PostgreSQL and MongoDB (MongoDB part is not implemented yet).
 */
router.get('/Teams', async (req, res) => {
    try {
        const searchText = req.query.query;

        const teamPromise = axios.get('http://localhost:8080/Team/search', {params: {query: searchText}});

        const [teamResponse, clubsResponse] = await Promise.all([teamPromise]);

        const response = {
            postgres: teamResponse.data,
            mongo: []
        };

        res.json(response);
    } catch (error) {
        console.error('Error in search: ', error);
        res.status(500).send('Internal server error');
    }
});

/**
 * Searches for championships based on a query string and returns a combined response from different databases.
 * Currently, it only fetches data from a PostgreSQL database.
 *
 * @route GET /Championships
 * @param {string} req.query.query - The search query for championship names.
 * @returns {JSON} An object containing arrays of championships from PostgreSQL and MongoDB (MongoDB part is not implemented yet).
 */
router.get('/Championships', async (req, res) => {
    try {
        const searchText = req.query.query;

        const champPromise = axios.get('http://localhost:8080/Championship/search', {params: {query: searchText}});

        const [champResponse, clubsResponse] = await Promise.all([champPromise]);

        const response = {
            postgres: champResponse.data,
            mongo: []
        };

        res.json(response);
    } catch (error) {
        console.error('Error in search: ', error);
        res.status(500).send('Internal server error');
    }
});
/**
 * Searches for matches based on a query string and returns a list of possible matches.
 * 
 * @route GET /Matches
 * @param {string} req.query.query - The search query for match names.
 * @returns {JSON} An object containing arrays of matches from PostgreSQL and MongoDB (MongoDB part is not implemented yet).
 */
router.get('/Matches', async (req, res) => {
    try {
        const searchText = req.query.query;

        const gamesPromise = axios.get('http://localhost:3001/api/searchGames', {params: {query: searchText}});

        const [gamesResponse] = await Promise.all([gamesPromise]);

        const response = {
            postgres: [],
            mongo: gamesResponse.data
        };
        res.json(response);
    } catch (error) {
        console.error('Error in search: ', error);
        res.status(500).send('Internal server error');
    }
});

module.exports = router;