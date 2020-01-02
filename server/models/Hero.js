const mongoose = require("mongoose")

const schema = new mongoose.Schema({
    name: { type: String },
    icon: { type: String },
    title: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Category' }],
    scores: {
        difficulty: { type: Number },
        skill: { type: Number },
        attack: { type: Number },
        survive: { type: Number },
    },
    skills:[{
        icon: { type: String },
        name: { type: String },
        chillDownConsume: { type: String },
        description: { type: String },
        tips: { type: String },
    }],
    goods1: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Good' }],
    goods2: [{ type: mongoose.SchemaTypes.ObjectId, ref: 'Good' }],
    usageTips: { type: String },
    battleTips: { type: String },
    teamTips: { type: String },
    partners: [{
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: 'Hero' },
        description: { type: String },
    }],
})

module.exports = mongoose.model('Hero', schema)