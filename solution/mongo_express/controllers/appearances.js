const Appearances = require('../models/appearances');

function showAllAppearances() {
    return new Promise((resolve, reject) => {
        Appearances.find({})
            .then(results => {
                resolve(results);
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = { showAllAppearances };
