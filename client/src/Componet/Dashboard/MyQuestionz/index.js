import React, { useState, useEffect } from 'react';
import { Navbar, Form, ButtonGroup, Col, Container, Button } from 'react-bootstrap';
import { Accordion, Card, Modal } from 'react-bootstrap';
import axios from 'axios';
// MyQuestions
function MyQuestions(props) {
  //State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // loginInfo
  const [QandA, setQandA] = useState({ question: "", answer: "" });
  const [message, setMessage] = useState('');
  const [QuestionList, setQuestionList] = useState([])
  // Form Action
  // onChange - get and set state for Login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQandA({ ...QandA, [name]: value });
  };
  // handleDelete
  const handleDelete = (questID) => {
    console.log("QUEST ID " + JSON.stringify(questID));
    setMessage("Deleting...")
      // Axios poooower
      axios.post("http://localhost:4000/quiz/delete", 
        { userID: props.user, questID: questID})
      .then((data) => {
        if(data.data.deletedCount === 1){
          setMessage("Question removed!")
        } else {
          setMessage("Error removing...")
        }
      })
      .catch((err) => { setMessage("Error connecting to Auth server" + JSON.stringify(err)) });
  };
  // handleSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!QandA.question || !QandA.answer) {
      setMessage("Question and Answers are required")
    } else {
      setMessage("Fetching...")
      // Axios poooower
      axios.post("http://localhost:4000/quiz/add", { userID: props.user, quiz: { question: QandA.question, answer: QandA.answer }})
      .then((data) => {
          if (data.data.error){
            setMessage("bad... " + JSON.stringify(data.data.error))
          } else if (data.data._id) {
              setMessage("QandA been Added")
          } else { setMessage("Something else wrong") }
      })
      .catch((err) => { setMessage("Error connecting to Auth server" + JSON.stringify(err)) });
    }
    setQandA({ question: "", answer: "" })
    handleClose()
  };
  // Load user questions
  useEffect(() => {
      // Axios poooower
      axios.post("http://localhost:4000/quiz/user", { userID: props.user })
      .then((data) => { setQuestionList(data.data); })
      .catch((err) => { console.log("Error connecting to Auth server: " + JSON.stringify(err)) });
  }, [QuestionList, props.user]);
  // return
  return (
    <>
      <Col>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand>My Questionaries</Navbar.Brand>
          <Form inline> <Button variant="outline-info" onClick={handleShow}>Add</Button> </Form>
        </Navbar>
        {message}
        {QuestionList.map((qa, i) => {
           // Return
           return (
            <Accordion key={qa._id}>
              <Card>
                <Card.Header>
                  <Accordion.Toggle as={Button} variant="link" eventKey={i+1}>
                    <Button variant="light">{qa.quiz.question} &darr;</Button>
                  </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={i+1}>
                  <Card.Body>
                    <h5>Answer: {qa.quiz.answer}</h5>
                    <ButtonGroup aria-label="Edit">
                      <Button onClick={() => handleDelete(qa._id)} style={{ margin:'5px' }} size="sm" variant="danger">Delete</Button>
                    </ButtonGroup>
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>)
          })}
      </Col>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add a Question With a answer</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {message}
          <Container>
            <input name="question" placeholder="What is your questions?" type="text"
              onChange={handleChange} value={QandA.question} required />
            <input name="answer" placeholder="What is your Answer for your questions?" type="text"
              onChange={handleChange} value={QandA.answer} required />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleSubmit}> Add a QandA </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
// export
export default MyQuestions;
