import React, { useState } from 'react';
import { Navbar, Form, FormControl, Nav, Col, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
// WorldScorez
function WorldScores(props) {
  // return
  return (
    <Col>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">World Score</Navbar.Brand>
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
  );
}

export default WorldScores;
