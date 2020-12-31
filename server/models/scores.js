const mongoose = require("mongoose")

const schema = mongoose.Schema({
    userID: String,
	score: {
        date: String,
        score: String
    },
})

module.exports = mongoose.model("Score", schema)