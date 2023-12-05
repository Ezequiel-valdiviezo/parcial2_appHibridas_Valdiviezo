// Header.jsx
import React, { useState } from 'react'
import Logo from '../assets/logopng.png'

import { useNavigate } from "react-router-dom"

const Login = () => {


  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()

  const handleEmailChange = (e)=>{
    setEmail(e.target.value) // fuerza el renderizado
  }

  const handlePasswordChange = (e) =>{
    setPassword(e.target.value)
  }

  const handleFormSubmit = (e) =>{
    e.preventDefault()

    fetch('http://localhost:2023/api/users/session', {
      method: 'POST',
      headers:{
        'Content-type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
    .then((res)=>
      // if(!res.ok){
      //   console.log("esta todo mal")
      //   throw new Error('Usuario o contraseña incorrecta');
      // }
      res.json()
    )
    .then((result)=>{
      console.log(result)
      localStorage.setItem('token', result.token)
      localStorage.setItem('rol', result.account.rol)
      navigate('/home', {replace: true})
    })
  }


  return (
    <div className='login'>
        <div className="loginContainer">
            <img src={Logo} alt="" />
            <h2>Iniciar Sesión</h2>
            <form onSubmit={handleFormSubmit}>
              <div>
                <label>
                  Email: 
                  <input type="email" required onChange={handleEmailChange} value={email} />
                </label>
              </div>
              <div>
                <label>
                  Password:
                  <input id="txtPassword" type="password" required onChange={handlePasswordChange} value={password} />
                </label>
              </div>

              <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    </div>
  );
};

export default Login;
