import React, { useState } from 'react';
import { Navbar, Form, FormControl, Nav, Col, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';

import MyQuestions from '../../Componet/Dashboard/MyQuestionz';
import MyScores from '../../Componet/Dashboard/MyScorez';
import WorldScores from '../../Componet/Dashboard/WorldScorez';

// Dashboard
function Dashboard(props) {
  // Logout
  const logout = () => {
    props.history.push("/");
  }
  // return
  return (
    <Container>

      <Navbar bg="dark" variant="dark" className="m-3">
        <Navbar.Brand href="#home">Quizzzze</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home">UserName</Nav.Link>
        </Nav>
        <Form inline>
          <Button onClick={logout} variant="outline-info">Log out</Button>
        </Form>
      </Navbar>
      
      <Row>
        <MyQuestions />
        <MyScores />
        <WorldScores />
      </Row>
    </Container>
  );
}

export default Dashboard;
