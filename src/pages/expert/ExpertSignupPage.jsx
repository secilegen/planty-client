import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function ExpertSignupPage() {


    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [errorMessage, setErrorMessage] = useState(undefined)
    const isExpert = true

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, firstName, lastName, isExpert };

        axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        navigate('/expert/login');
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
    }

  return (
    
    <div className="SignupPage">
       <h1> Sign Up </h1> 
       <form onSubmit={handleSubmit}>
       <div className="signup-box">
          <div className="signup-label">
       <label>First Name:</label>
       </div>
          <div className="signup-input">
        <input 
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
        />
</div>
        </div>
        <div className="signup-box">
          <div className="signup-label">
        <label>Last Name:</label>
        </div>
          <div className="signup-input">
        <input 
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
        />
</div>
        </div>
        <div className="signup-box">
          <div className="signup-label">
        <label>Email:</label>
        </div>
          <div className="signup-input">
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
           </div>
        </div>
        <div className="signup-box">
          <div className="signup-label">

        <label>Password:</label>
        </div>
          <div className="signup-input">
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
      </div>
        </div>
        
        <div className="signup-button">
        <button type="submit" className="small-button button-filled-green">Sign Up</button>
        </div>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have an account?</p>
      <Link to={"/expert/login"}>Login</Link>

       </div>
  )
}

export default ExpertSignupPage