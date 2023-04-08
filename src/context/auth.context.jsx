import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;
 
const AuthContext = React.createContext();
 
function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [isExpert, setIsExpert] = useState(false)
  const navigate = useNavigate()

  const storeToken = (token) => {      
    localStorage.setItem('authToken', token);
  }
 
  const authenticateUser = () => {          
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      axios.get(
        `${API_URL}/auth/verify`, 
        { headers: { Authorization: `Bearer ${storedToken}`} }
      )
      .then((response) => {
        const user = response.data;
        setIsLoggedIn(true);
        setIsLoading(false);
        setUser(user);
        setIsExpert(user.isExpert)        
      })
      .catch((error) => {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        setIsExpert(false)        
      });      
    } else {
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
        setIsExpert(false)      
    }   
  }
 
  const removeToken = () => {                  
    localStorage.removeItem("authToken");
  }
 
 
  const logOutUser = () => {                     
    removeToken();
    authenticateUser();
    navigate('/')
  }  
  
  useEffect(() => {                                                   
    authenticateUser()  }, []);
 
  

  return (
    <AuthContext.Provider value={{ isLoggedIn, isLoading, user, isExpert, storeToken, authenticateUser, logOutUser }}>
      {props.children}
    </AuthContext.Provider>
  )
}
 
export { AuthProviderWrapper, AuthContext };