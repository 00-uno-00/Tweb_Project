const mongoose = require('mongoose');

const GameEvents = new mongoose.Schema(
    {
        game_event_id: {type: String, required: true},
        date: {type: Date, required: true},
        game_id: {type: Number, required: true},
        club_id: {type: Number, required: true},
        player_id: {type: Number, required: true},
        minute: {type: Number},
        type: {type: String},
        description: {type: String},
        player_in_id: {type: Number},
        player_assist_id: {type: Number},
    }
);

GameEvents.set('toObject', {getters: true, virtuals: true});

module.exports = mongoose.model('g_events', GameEvents);