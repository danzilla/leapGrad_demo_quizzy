import React, { useState } from 'react';
import { Navbar, Form, FormControl, Nav, Col, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card, Modal } from 'react-bootstrap';
// MyQuestions
function MyQuestions(props) {

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // loginInfo
  const [QandA, setQandA] = useState({ question: "", answer: "" });
  const [message, setMessage] = useState('nada');
  // Form Action
  // onChange - get and set state for Login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setQandA({ ...QandA, [name]: value });
  };
  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!QandA.question || !QandA.answer) {
      setMessage("Question and Answers are required")
    } else {
      setMessage("Question and Answers are GOOD!")
    }
  };

  // return
  return (
    <>
      <Col>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand href="#home">My Questionaries</Navbar.Brand>
          <Form inline> <Button variant="outline-info" onClick={handleShow}>Add</Button> </Form>
        </Navbar>
        <Accordion>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="0">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="0">
              <Card.Body>Hello! I'm the body</Card.Body>
            </Accordion.Collapse>
          </Card>
          <Card>
            <Card.Header>
              <Accordion.Toggle as={Button} variant="link" eventKey="1">
                Click me!
              </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey="1">
              <Card.Body>Hello! I'm another body</Card.Body>
            </Accordion.Collapse>
          </Card>
        </Accordion>
      </Col>

      <Modal show={show} onHide={handleClose}>
        
        <Modal.Header closeButton>
          <Modal.Title>Add a new Question with answer</Modal.Title>
        </Modal.Header>
        
        <Modal.Body>
          {JSON.stringify(message)} <br /> {JSON.stringify(QandA)}
          <Container>
            <input name="question" placeholder="What is your questions?" type="text"
              onChange={handleChange} value={QandA.question} required />
            <input name="answer" placeholder="What is your Answer for your questions?" type="text"
              onChange={handleChange} value={QandA.answer} required />
          </Container>
        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}> Close </Button>
          <Button variant="primary" onClick={handleSubmit}> Save Changes </Button>
        </Modal.Footer>
      </Modal>

    </>
  );
}

export default MyQuestions;
