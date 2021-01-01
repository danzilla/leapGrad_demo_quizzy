import React, {useState, useEffect} from 'react';
import { Navbar, Col, Button } from 'react-bootstrap';
import { Accordion, Card } from 'react-bootstrap';
import axios from 'axios';
// WorldScorez
function WorldScores(props) {
  // Score
  const [scoreList, setScoreList] = useState([])
  // Load user questions
  useEffect(() => {
    // Axios poooower
    axios.get("http://localhost:4000/score/all")
      .then((data) => { setScoreList(data.data); })
      .catch((err) => { console.log("Error connecting to Auth server: " + JSON.stringify(err)) });
  }, [scoreList]);
  // https://edisondevadoss.medium.com/javascript-group-an-array-of-objects-by-key-afc85c35d07e
  let group = scoreList.reduce((r, a) => {
    r[a.userID] = [...r[a.userID] || [], a];
    return r;
   }, {});
  // return
  return (
    <Col>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand>World Score</Navbar.Brand>
      </Navbar>
      {Object.keys(group).map((qa, i) => {
        // Return
        return (
          <Accordion key={i+1}>
            <Card>
              <Card.Header>
                <Accordion.Toggle as={Button} variant="link" eventKey={i+1}>
                  <p>User: {group[qa][0].userID}</p>
                </Accordion.Toggle>
              </Card.Header>
              <Accordion.Collapse eventKey={i+1}>
                <Card.Body>
                  { group[qa].map((value, index) => {
                    return <>
                      <h4 key={index}>Attempted: {index+1}</h4>
                      <h4 key={index}>Scored: {value.score}</h4>
                      <h5 key={index}>Attempted Questions</h5>
                        { value.results.map((res, k) => {
                          return <>
                            <p style={{ margin: 0 }} key={k}>Question: {res.question}</p>
                            <p style={{ margin: 0 }} key={k}>Answer: {res.answer}</p>
                            <p style={{ margin: 0 }} key={k}>User Answer: {res.userAnswer}</p>
                            <br />
                          </>
                        })}
                    </>
                  })}
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>)
      })}
    </Col>
  );
}

export default WorldScores;
