const mongoose = require('mongoose');

const Games = new mongoose.Schema(
    {
        game_id: { type: Number, required: true },
        competition_id: { type: String, required: true },
        season: { type: Number, required: true },
        round: { type: String, required: true },
        date: { type: Date, required: true },
        home_club_id: { type: Number, required: true },
        away_club_id: { type: Number, required: true },
        home_club_goals: { type: Number },
        away_club_goals: { type: Number },
        home_club_position: { type: Number },
        away_club_position: { type: Number },
        home_club_manager_name: { type: String },
        away_club_manager_name: { type: String },
        stadium: { type: String },
        attendance: { type: Number },
        referee: { type: String },
        url: { type: String, required: true },
        home_club_formation: { type: String },
        away_club_formation: { type: String },
        home_club_name: { type: String },
        away_club_name: { type: String },
        aggregate: { type: String },
        competition_type: { type: String, required: true },
    }
);

Games.set('toObject', {getters: true, virtuals: true});

module.exports = mongoose.model('Games', Games);