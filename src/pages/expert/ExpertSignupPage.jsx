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
    const [errorMessageFirstName, setErrorMessageFirstName] = useState("");
  const [errorMessageLastName, setErrorMessageLastName] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [successMessage, setSuccessMessage] = useState('')
    const isExpert = true

    const navigate = useNavigate()

    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)
    const handleFirstName = (e) => setFirstName(e.target.value)
    const handleLastName = (e) => setLastName(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()
        const requestBody = { email, password, firstName, lastName, isExpert };

        if (!email) {
          setErrorMessageEmail("Please add an email address");
        } else{
          setErrorMessageEmail("")
    
        }


        if (!password){
          setErrorMessagePassword("Please add a password");
        } else {
          setErrorMessagePassword("");
        }
    
        if (!firstName) {
          setErrorMessageFirstName("Please add your first name");
        } else {
          setErrorMessageFirstName("");
        }
    
        if (!lastName) {
          setErrorMessageLastName("Please add your last name")
        } else {
          setErrorMessageLastName("");
        }
          
        if (email && password && firstName && lastName) {



        axios.post(`${API_URL}/auth/signup`, requestBody)
      .then((response) => {
        setSuccessMessage(`You just created your planty expert profile - welcome to planty!`)
				setTimeout(() => {
                    
					navigate("/expert/login")
				}, 3000)
        
      })
      .catch((error) => {
       console.log("error with sign up", error)
      });
    }}

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
        <p className="errorText">{errorMessageFirstName}</p>
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
        <p className="errorText">{errorMessageLastName}</p>
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
        <p className="errorText">{errorMessageEmail}</p>
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
         <p className="errorText">{errorMessagePassword}</p>
      </div>
        </div>
        
        <p className="successMessage">{successMessage}</p>
        <div className="signup-button">
        <button type="submit" className="small-button button-filled-green">Sign Up</button>
        </div>
      </form>

     
 
      <p>Already have an account?</p>
      <Link to={"/expert/login"}>Login</Link>

       </div>
  )
}

export default ExpertSignupPage