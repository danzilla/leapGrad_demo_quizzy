const express = require("express")
const router = express.Router()
const scoreModel = require("../models/scores")
// Add Score
router.post("/add", async (req, res) => {
    const addScore = new scoreModel({
        userID: req.body.resultz.userID,
        date: req.body.resultz.date,
        score: req.body.resultz.score,
        results: req.body.resultz.results,
	})
    await addScore.save()
	res.send(addScore)
})
// get User Score
router.post("/user", async (req, res) => {
    const Score = await scoreModel.find({ userID: req.body.userID })
    if(Score == null){
        res.status(404)
        res.send({ error: "Score doesn't exist!" })
    } else if(Score) {
        res.send(Score)
    }
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