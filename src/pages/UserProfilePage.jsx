import { useContext, useEffect, useState } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import axios from 'axios'
import { Link } from "react-router-dom";
const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005'

function UserProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [userToView, setUserToView] = useState("")

  useEffect(()=>{
    axios.get(`${API_URL}/api/user/${user._id}`)
    .then(result=>{
      setUserToView(result.data)
     })
  },[user._id])

  return (
    <div>
    <h1>Welcome {userToView.firstName}</h1>
    
    <Link to="/profile/edit">
            <button>Edit Profile</button>
          </Link>   
    
    </div>
  )
}

export default UserProfilePage