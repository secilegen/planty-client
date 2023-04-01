import { useContext, useEffect, useState } from "react";                     
import { AuthContext } from "../../context/auth.context"; 
import axios from 'axios'
import { Link } from "react-router-dom";
import UserHeader from "../../components/UserHeader";

const API_URL = "http://localhost:5005";

// add islogged in feature hgere

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
    <UserHeader user={userToView}/>
    <h1>Welcome {userToView.firstName} {userToView.lastName}</h1>
    <img src={userToView.image}/>

    <Link to="/profile/edit">
            <button>Edit Profile</button>
          </Link>   
    
    </div>
  )
}

export default UserProfilePage