import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { Link, useNavigate } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'


function ExpertLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const isExpert = true
  
  const navigate = useNavigate();

  const { storeToken, authenticateUser } = useContext(AuthContext); 

  const handleEmail = (e) => setEmail(e.target.value);
  const handlePassword = (e) => setPassword(e.target.value);

  
  const handleLoginSubmit = (e) => {

    e.preventDefault();
    const requestBody = { email, password, isExpert };
 
    axios.post(`${API_URL}/auth/login`, requestBody)
      .then((response) => {
        console.log('JWT token', response.data.authToken );
      
        storeToken(response.data.authToken)
        authenticateUser()

        navigate('/')                                
      })
      .catch((error) => {
        const errorDescription = error.response.data.message;
        setErrorMessage(errorDescription);
      })
  };
  
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
        </div>
        </div>
        <div>
        <button type="submit" className="small-button button-filled-green">Login</button>
        </div>
      </form>
      { errorMessage && <p className="error-message">{errorMessage}</p> }

      <p>Don't have an account yet?</p>
      <Link to={"/expert/signup"}> Sign Up</Link>
    </div>
  )
}

export default ExpertLoginPage