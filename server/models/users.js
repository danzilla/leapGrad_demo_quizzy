const mongoose = require("mongoose")

const schema = mongoose.Schema({
    fullname: String,
	username: String,
    password: String,
})

module.exports = mongoose.model("User", schema)