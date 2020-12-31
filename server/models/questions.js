const mongoose = require("mongoose")

const schema = mongoose.Schema({
    userID: String,
	quiz: {
        question: String,
        answer: String
    },
})

module.exports = mongoose.model("Queiz", schema)