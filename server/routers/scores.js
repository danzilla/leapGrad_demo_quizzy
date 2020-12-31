const express = require("express")
const router = express.Router()
const scoreModel = require("../models/scores")

// Add Score
router.get("/add", async (req, res) => {
    const addScore = new scoreModel({
        userID: "String",
        score: {
            date: "String",
            score: "String"
        },
	})
	await addScore.save()
	res.send(addScore)
})
// View All Score
router.get("/all", async (req, res) => {
    const allScore = await scoreModel.find()
    if(allScore == null){
        res.status(404)
        res.send({ error: "Score doesn't exist!" })
    } else if(allScore) {
        res.send(allScore)
    }
})

module.exports = router