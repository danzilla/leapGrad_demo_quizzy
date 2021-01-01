const mongoose = require("mongoose")

const schemaResult = new mongoose.Schema({
    question: String,
    answer: String,
    userAnswer: String,
    score: Number
})
const schema = new mongoose.Schema({
    userID: String,
    date: String,
    score: Number,
    results: [schemaResult],
})

module.exports = mongoose.model("Score", schema)