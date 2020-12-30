import { useState } from 'react';
import Register from '../../Componet/Authentication/register';
import Login from '../../Componet/Authentication/login';
// Auth
function Authentication() {
  // States
  const [activeLogin, setActiveLogin] = useState(true)
  const [activeRegister, setActiveRegister] = useState(false)
  // isLogin
  const isLogin = () => {
    setActiveLogin(true)
    setActiveRegister(false)
  }
  // isRegister
  const isRegister = () => {
    setActiveLogin(false)
    setActiveRegister(true)
  }
  // Set ActivePage
  if(activeRegister === true) { 
    return <Register isLogin={isLogin} isRegister={isRegister} /> 
  } else if (activeLogin) { 
    return <Login isLogin={isLogin} isRegister={isRegister} /> 
  }
}
export default Authentication;
