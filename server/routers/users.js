const express = require("express")
const router = express.Router()
const userModel = require("../models/users")
// Login
router.post("/login", async (req, res) => {
    const user = await userModel.findOne({ username: req.body.user })
    if (user == null) {
        res.send({ error: "User doesn't exist!" })
    } else if (user) {
        if (user.password !== req.body.password) {
            res.send({ error: "User and password are not match :(" })
        } else if (user) {
            // all good
            res.send(user)
        }
    }
})
// Register
router.post("/add", async (req, res) => {
    if (!req.body) {
        res.send({ error: "User details required! " })
    } else {
        const user = await userModel.findOne({ username: req.body.username })
        if (user == null) {
            const addUser = new userModel({
                fullname: req.body.fullName,
                username: req.body.username,
                password: req.body.password
            })
            await addUser.save()
            res.send(addUser)
        } else if (user._id) {
            res.send({ error: "User alredy exit..." })
        }
    }
})
// Get all users
router.get("/all", async (req, res) => {
    const allUsers = await userModel.find()
    res.send(allUsers)
})
// Router
module.exports = router