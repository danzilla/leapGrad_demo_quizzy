const express = require("express")
const router = express.Router()
const quizModel = require("../models/questions")
// Add Question
router.get("/add", async (req, res) => {
    const addQuestion = new quizModel({
        userID: "AAAA String",
        quiz: {
            question: "1 + 1",
            answer: "2"
        },
	})
	await addQuestion.save()
	res.send(addQuestion)
})
// View All Question
router.get("/all", async (req, res) => {
    const allQuestion = await quizModel.find()
    if(allQuestion == null){
        res.status(404)
        res.send({ error: "Questions doesn't exist!" })
    } else if(allQuestion) {
        res.send(allQuestion)
    }
})
// Router
module.exports = router