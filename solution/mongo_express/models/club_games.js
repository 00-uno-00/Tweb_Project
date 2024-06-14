const mongoose = require('mongoose');

const ClubGames = new mongoose.Schema(
    {
        game_id: { type: Number, required: true },
        club_id: { type: Number, required: true },
        own_goals: { type: Number },
        own_position: { type: Number },
        own_manager_name: { type: String },
        opponent_id: { type: Number, required: true },
        opponent_goals: { type: Number },
        opponent_position: { type: Number },
        opponent_manager_name: { type: String },
        hosting: { type: String, required: true },
        is_win: { type: Boolean, required: true },
        is_tie: { type: Boolean, required: true },
    }
);

ClubGames.set('toObject', {getters: true, virtuals: true});

module.exports = mongoose.model('ClubGames', ClubGames);