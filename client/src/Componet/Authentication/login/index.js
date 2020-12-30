import React, { useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// Login
function Login(props) {
  // loginInfo
  const [loginInfo, setLoginInfo] = useState({ userName: "", userPassword: "" });
  const [message, setMessage] = useState('nada');
  // Form Action
  // onChange - get and set state for Login form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginInfo({ ...loginInfo, [name]: value });
  };
  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginInfo.userName || !loginInfo.userPassword) {
      setMessage("User name and Password are required")
    } else {
      setMessage("User name and Password are GOOD!")
      props.history.push("/dashboard")
    }
  };
  // return
  return (
    <Container>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {JSON.stringify(message)} - {JSON.stringify(loginInfo)}
        <Row className="justify-content-md-center">
          <Col>
            <input name="userName" type="text"
              onChange={handleChange}
              value={loginInfo.userName} required />
            <input name="userPassword" type="password"
              onChange={handleChange}
              value={loginInfo.userPassword} required />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={handleSubmit} style={{ marginRight:'10px' }} variant="primary">Login</Button>
          <Button onClick={props.isRegister} variant="danger">Register</Button>
        </Row>
      </div>
    </Container>
  );
}

export default withRouter(Login);