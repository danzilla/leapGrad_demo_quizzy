import React, { useState, useEffect } from 'react';
import { Navbar, Form, Col, Button } from 'react-bootstrap';
import { Accordion, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
import TakeQuiz from './quizTake';
// MyScorez
function MyScores(props) {
  //State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // Score
  const [scoreList, setScoreList] = useState([])
  // Load user questions
  useEffect(() => {
    // Axios poooower
    axios.post("http://localhost:4000/score/user", { userID: props.user })
      .then((data) => { setScoreList(data.data); })
      .catch((err) => { console.log("Error connecting to Auth server: " + JSON.stringify(err)) });
  }, [scoreList]);
  // return
  return (
  <>
    <Col>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Score</Navbar.Brand>
        <Form inline> <Button variant="outline-info" onClick={handleShow}>Try a Quiz</Button> </Form>
      </Navbar>

      {scoreList.map((qa, i) => {
        // Return
        return (
          <Accordion key={qa._id}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={i+1}>
                  <p>Scored: {qa.score}</p>
                  <p>Completed:{qa.date}</p>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={i+1}>
                <Card.Body>
                  {qa.results.map((value, index) => {
                    return <>
                        <p style={{ margin: 0 }} key={index}>Question: {value.question}</p>
                        <p style={{ margin: 0 }} key={index}>Answer: {value.answer}</p>
                        <p style={{ margin: 0 }} key={index}>User Answer: {value.userAnswer}</p>
                        <br />
                      </>
                    })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>)
      })}
    </Col>
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Random questions from users</Modal.Title>
      </Modal.Header>
      <TakeQuiz handleClose={handleClose}/>
    </Modal>
  </>
  );
}

export default MyScores;
