const express = require('express')
const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

const uri = "mongodb+srv://danzilla:hahaTestingDB@hahahquizzy.ftupy.mongodb.net/quizy_db?retryWrites=true&w=majority";
const mongoose = require("mongoose")

// Router
const userRouter = require('./routers/users')
const scoreRouter = require('./routers/scores')
const quizRouter = require('./routers/questions')

mongoose
    .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
	.then(() => {
        console.log('Connected to Database')
        // App
        const app = express()
        app.use('/user', userRouter)
        app.use('/score', scoreRouter)
        app.use('/quiz', quizRouter)
        // App Fire
		app.listen(4000, () => {
            console.log('Server listening on 4000 \n')
        })
    }) 