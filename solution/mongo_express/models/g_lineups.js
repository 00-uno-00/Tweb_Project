const mongoose = require('mongoose');

const GameLineups = new mongoose.Schema(
    {
        game_lineups_id: { type: String, required: true },
        game_id: { type: Number, required: true },
        club_id: { type: Number, required: true },
        player_id: { type: Number, required: true },
        type: { type: String },
        number: { type: String },
        player_name: { type: String },
        team_captain: { type: Boolean },
        position: { type: String },
    }
);

GameLineups.set('toObject', {getters: true, virtuals: true});

module.exports = mongoose.model('GameLineups', GameLineups);