import React from 'react'
import { Link, useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from 'axios'

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function SignupPage(props) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isCompany, setIsCompany] = useState(false)
    const [errorMessage, setErrorMessage] = useState(undefined)
    const isExpert = false


    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)
    const handleIsCompany = (e) => setIsCompany(e.target.checked)

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, firstName, lastName, isExpert };
        console.log('Request bosy on submit page is', requestBody)
        axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        console.log('Submit response is: ', response)
        navigate('/login');
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

       <label>First Name:</label>
        <input 
          type="text"
          name="firstName"
          value={firstName}
          onChange={handleFirstName}
        />

        <label>Last Name:</label>
        <input 
          type="text"
          name="lastName"
          value={lastName}
          onChange={handleLastName}
        />

        <label>Email:</label>
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
 
        <label>Password:</label>
        <input 
          type="password"
          name="password"
          value={password}
          onChange={handlePassword}
        />
 
        <label>I would like to sign up as a business owner</label>
        <input
          type="checkbox"  
          name='isCompany'
          value={isCompany}
          onChange={handleIsCompany}     
        />
        <button type="submit">Sign Up</button>
      </form>

      { errorMessage && <p className="error-message">{errorMessage}</p> }
 
      <p>Already have an account?</p>
      <Link to={"/login"}>Login</Link>

       </div>
  )
}

export default SignupPage