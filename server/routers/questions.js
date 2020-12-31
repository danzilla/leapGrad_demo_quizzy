const express = require("express")
const router = express.Router()
const quizModel = require("../models/questions")
// Add Question
router.post("/add", async (req, res) => {
    const addQuestion = new quizModel({
        userID: req.body.userID,
        quiz: {
            question: req.body.quiz.question,
            answer: req.body.quiz.answer
        },
	})
	await addQuestion.save()
	res.send(addQuestion)
})
// View User Question
router.post("/user", async (req, res) => {
    const userQuestion = await quizModel.find({ userID: req.body.userID })
    if(userQuestion == null){
        res.status(404)
        res.send({ error: "Questions doesn't exist!" })
    } else if(userQuestion) {
        res.send(userQuestion)
    }
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