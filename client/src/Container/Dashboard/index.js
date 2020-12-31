import React, { useState, useEffect } from 'react';
import { Navbar, Form, Nav, Row, Container, Button } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
// Componetz
import MyQuestions from '../../Componet/Dashboard/MyQuestionz';
import MyScores from '../../Componet/Dashboard/MyScorez';
import WorldScores from '../../Componet/Dashboard/WorldScorez';
// Dashboard
function Dashboard(props) {
  // Logout
  const logout = () => {
    sessionStorage.removeItem('session')
    props.history.push("/")
  }
  // Session Manage
  let session = JSON.parse(sessionStorage.getItem('session'))
  useEffect(() => { 
    session = JSON.parse(sessionStorage.getItem('session'))
  }, [session]);
  // return
  return (
    <Container>
      <Navbar bg="dark" variant="dark" className="m-3">
        <Navbar.Brand href="#home">Quizzzze</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link href="#home"> {session.fullname}</Nav.Link>
        </Nav>
        <Form inline>
          <Button onClick={logout} variant="outline-info">Log out</Button>
        </Form>
      </Navbar>
      <Row>
        <MyQuestions user={session._id} />
        <MyScores user={session._id} />
        <WorldScores />
      </Row>
    </Container>
  );
}
// Export
export default Dashboard;
