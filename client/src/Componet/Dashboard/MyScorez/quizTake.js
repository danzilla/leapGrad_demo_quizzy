import React, { useState, useEffect } from 'react';
import {Container, Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import moment from 'moment';
// TakeQuiz
function TakeQuiz(props) {
    // States for Questions
    const [QuestionList, setQuestionList] = useState([])
    const [QandA, setQandA] = useState();
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQandA({ ...QandA, [name]: value });
    };
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault()
        let session = JSON.parse(sessionStorage.getItem('session'))
        // User Try
        let userTry = {
            userID: session._id,
            date: moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
            score: 0,
            results: []
        };
        for (let quizID in QandA){
            for(let i = 0; i < QuestionList.length; i++){
                if(quizID === QuestionList[i]._id){
                    // Results
                    let userResult = {
                        question: '',
                        answer: '',
                        userAnswer: '',
                        score: ''
                    }
                    userResult.question = QuestionList[i].quiz.question;
                    userResult.answer = QuestionList[i].quiz.answer;
                    userResult.userAnswer = QandA[QuestionList[i]._id];
                    // https://stackoverflow.com/questions/4244896/dynamically-access-object-property-using-variable
                    if(QuestionList[i].quiz.answer == QandA[QuestionList[i]._id]){
                        userResult.score = 1;
                        userTry.score = userTry.score + 1;
                    } else {
                        userResult.score = 0;
                    }
                    userTry.results.push(userResult)
                    // console.log("QID" + QuestionList[i]._id);
                    // console.log("Q" + QuestionList[i].quiz.question);
                    // console.log("QA" + QuestionList[i].quiz.answer);
                    // console.log("CA" + QandA[QuestionList[i]._id]);
                }
            }
        }
        // If array is full and good
        if (userTry.results && userTry.results.length) {
            // Axios poooower
            axios.post("http://localhost:4000/score/add", { resultz: userTry})
            .then((data) => {
                console.log(JSON.stringify(data.data));
            })
            .catch((err) => { console.log("Error connecting to Auth server" + JSON.stringify(err)) });
        }
        // console.log(JSON.stringify(QuestionList))
        // console.log(JSON.stringify(QandA))
        props.handleClose();
    };
    // Load user questions
    useEffect(() => {
        // Axios poooower
        axios.get("http://localhost:4000/quiz/all")
        .then((data) => {
            // Random Item from List of Questions
            let result = data.data.slice(0, 5).map(function () { 
                return this.splice(Math.floor(Math.random() * this.length), 1)[0];
            }, data.data.slice());
            setQuestionList(result); 
        })
        .catch((err) => { console.log("Error connecting to Auth server: " + JSON.stringify(err)) });
    }, []);
    // return
    return (
        <>
            <Modal.Body>
                <Container>
                    {QuestionList.map((qa, i) => {            
                        // Return
                        return (
                            <>
                                <label>{qa.quiz.question}</label><br />
                                <input key={i+1}
                                    name={qa._id} onChange={handleChange}
                                    type="text" style={{ margin:'2px' }} required /><br />
                            </>)
                        })
                    }
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSubmit}> Submit </Button>
            </Modal.Footer>
        </>
    );
}
// Export
export default TakeQuiz;
