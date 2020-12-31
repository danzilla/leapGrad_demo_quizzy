const express = require("express")
const router = express.Router()
const userModel = require("../models/users")
// Login
router.get("/login", async (req, res) => {
    const user = await userModel.findOne({ fullname: "he" })
    if(user == null){
        res.status(404)
        res.send({ error: "User doesn't exist!" })
    } else if(user) {
        res.send(user)
    }
})
// Register
router.get("/add", async (req, res) => {
    const addUser = new userModel({
		fullname: "aaahe",
        username: "hello 3134",
        password: "asdadasas"
	})
	await addUser.save()
	res.send(addUser)
})
// Get all users
router.get("/all", async (req, res) => {
	const allUsers = await userModel.find()
	res.send(allUsers)
})

module.exports = router