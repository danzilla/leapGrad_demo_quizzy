import React, { useState } from 'react';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

// Register
function Register(props) {
  // RegisterInfo
  const [registerInfo, setRegisterInfo] = useState({ fullName: "", userName: "", userPassword: "" });
  const [message, setMessage] = useState('nada');
  // Form Action
  // onChange - get and set state for Register form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRegisterInfo({ ...registerInfo, [name]: value });
  };
  // onSubmit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!registerInfo.fullName || !registerInfo.userName || !registerInfo.userPassword) {
      setMessage("User name and Password are required")
    } else {
      setMessage("User name and Password are GOOD!")
    }
  };
  // return
  return (
    <Container>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {JSON.stringify(message)} - {JSON.stringify(registerInfo)}
        <Row className="justify-content-md-center">
          <Col>
            <input name="fullName" type="text"
              placeholder="Full Name"
              onChange={handleChange}
              value={registerInfo.fullName} required />
            <input name="userName" type="text"
              placeholder="User Name"
              onChange={handleChange}
              value={registerInfo.userName} required />
            <br />
            <input name="userPassword" type="password"
              placeholder="Password"
              onChange={handleChange}
              value={registerInfo.userPassword} required />
            <input name="confirmUserPassword" type="password"
              placeholder="Confirm Password"
              onChange={handleChange}
              value={registerInfo.userPassword} required />
          </Col>
        </Row>
        <Row className="justify-content-md-center">
          <Button onClick={handleSubmit} style={{ marginRight:'10px' }} variant="primary">Register Account</Button>
          <Button variant="danger" onClick={props.isLogin}>Login</Button>
        </Row>
      </div>
    </Container>
  );
}

export default withRouter(Register);