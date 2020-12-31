import React, { useState } from 'react';
import axios from 'axios';
import { Col, Row, Container, Button } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
// Login
function Login(props) {
  // loginInfo
  const [loginInfo, setLoginInfo] = useState({ userName: "", userPassword: "" });
  const [message, setMessage] = useState('');
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
      setMessage("Fetching...")
      // Axios poooower
      axios.post("http://localhost:4000/user/login", { user: loginInfo.userName, password: loginInfo.userPassword })
      .then((data) => {
          if (data.data.error){
            setMessage("User name and Password bad..." + JSON.stringify(data.data.error))
          } else if (data.data._id) {
              setMessage("User name and Password are Good! " + data.data.fullname)
              sessionStorage.setItem('session', JSON.stringify(data.data));
              // wait 2.5sec and goto Dashboard - IF its good login
              setTimeout(() => props.history.push("/dashboard"), 2500);
          } else { setMessage("Something else wrong") }
      })
      .catch((err) => { setMessage("Error connecting to Auth server" + JSON.stringify(err)) });
    }
  };
  // return
  return (
    <Container>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {message}
        <Row className="justify-content-md-center">
          <Col>
            <input style={{ margin:'5px' }} name="userName" type="text"
              onChange={handleChange} value={loginInfo.userName} required />
            <input style={{ margin:'5px' }} name="userPassword" type="password"
              onChange={handleChange} value={loginInfo.userPassword} required />
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
// Export
export default withRouter(Login);