import React, { useState, useEffect } from 'react';
import { Navbar, Form, ButtonGroup, Col, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
// TakeQuiz
function TakeQuiz(props) {
    // States for Questions
    const [QuestionList, setQuestionList] = useState([])
    const [QandA, setQandA] = useState([]);
    const [message, setMessage] = useState('');
    // onChange - get and set state for Login form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setQandA({ ...QandA, [name]: value });
    };
    // onSubmit
    const handleSubmit = (e) => {
        e.preventDefault()

        console.log(JSON.stringify(QuestionList))
        console.log(JSON.stringify(QandA))
        props.handleClose()
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
        {JSON.stringify(QandA)}
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

export default TakeQuiz;
