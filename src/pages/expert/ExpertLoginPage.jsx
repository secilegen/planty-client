import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'


function ExpertLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessageEmail, setErrorMessageEmail] = useState("");
  const [errorMessagePassword, setErrorMessagePassword] = useState("");
  const [successMessage, setSuccessMessage] = useState('')

const isExpert = true
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {

    e.preventDefault();
    const requestBody = { email, password, isExpert };

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


 if (email && password) {
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken)
        authenticateUser()

        setSuccessMessage(`You successfully logged in - welcome back!`)
				setTimeout(() => {
                    
					navigate("/")
				}, 3000)

                                    
      })
      .catch((error) => {
        console.log("error with login", error)
      })
  }};
  
  return (
    <div className="LoginPage">
      <h1>Login</h1>

      <form onSubmit={handleLoginSubmit}>
        <div className="login-box">
          <div className="login-label">
        <label>Email:</label>
        </div>
        <div className="login-input">
        <input 
          type="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
         <p className="errorText">{errorMessageEmail}</p>
        </div>
        </div>
        <div className="login-box">
        <div className="login-label">
        <label>Password:</label>
        </div>
        <div className="login-input">
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
        <div className="login-button">
        <button type="submit" className="small-button button-filled-green">Login</button>
        </div>
      </form>
     

      <p>Don't have an account yet?</p>
      <Link to={"/expert/signup"}> Sign Up</Link>
    </div>
  )
}

export default ExpertLoginPage