import React, { useState } from 'react';
import { Navbar, Form, ButtonGroup, Col, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card, Modal } from 'react-bootstrap';
import TakeQuiz from './quizTake';
// MyScorez
function MyScores(props) {
  //State
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // return
  return (
  <>
    <Col>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">My Score</Navbar.Brand>
        <Form inline> <Button variant="outline-info" onClick={handleShow}>Try a Quiz</Button> </Form>
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
        <Modal.Title>Random questions from users</Modal.Title>
      </Modal.Header>
      <TakeQuiz handleClose={handleClose}/>
    </Modal>
  </>
  );
}

export default MyScores;
