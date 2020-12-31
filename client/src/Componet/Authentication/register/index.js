import React, { useState } from 'react';
import axios from 'axios';
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
      setMessage("Fetching...")
      // Axios poooower
      axios.post("http://localhost:4000/user/add", { fullName: registerInfo.fullName, username: registerInfo.userName, password: registerInfo.userPassword })
      .then((data) => {
          if (data.data.error){
            setMessage("User alredy exit?" + JSON.stringify(data.data.error))
          } else if (data.data._id) {
              setMessage("User Good to go!" + JSON.stringify(data.data))
              // wait 2.5sec and goto Dashboard - IF its good login
              // setTimeout(() => props.history.push("/dashboard"), 2500);
          } else { setMessage("Something else wrong") }
      })
      .catch((err) => { setMessage("Error connecting to Auth server" + JSON.stringify(err)) });
    }
  };
  // return
  return (
    <Container>
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        {JSON.stringify(message)} - {JSON.stringify(registerInfo)}
        <Row className="justify-content-md-center">
          <input style={{ margin:'5px' }} name="fullName" type="text" placeholder="Full Name"
            onChange={handleChange} value={registerInfo.fullName} required />
          <br />
          <input style={{ margin:'5px' }} name="userName" type="text" placeholder="User Name"
            onChange={handleChange} value={registerInfo.userName} required />
          <br />
          <input style={{ margin:'5px' }} name="userPassword" type="password" placeholder="Password"
            onChange={handleChange} value={registerInfo.userPassword} required />
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