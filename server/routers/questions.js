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

// Delete Question
router.post("/update", async (req, res) => {
    const QuestToUpdate = await quizModel.findOneAndUpdate(
        { userID: req.body.userID, _id: req.body.questID, quiz: quiz })
    if(QuestToUpdate == null){
        res.status(404)
        res.send({ error: "Error Updating!" })
    } else if(QuestToUpdate) {
        res.send(QuestToUpdate)
    }
})

// Delete Question
router.post("/delete", async (req, res) => {
    const QuestToDelete = await quizModel.deleteOne({ userID: req.body.userID, _id: req.body.questID })
    if(QuestToDelete == null){
        res.status(404)
        res.send({ error: "Error deleteing!" })
    } else if(QuestToDelete) {
        res.send(QuestToDelete)
    }
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