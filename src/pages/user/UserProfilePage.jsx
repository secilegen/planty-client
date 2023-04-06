import { useContext, useEffect, useState } from "react";                     
import { AuthContext } from "../../context/auth.context"; 
import axios from 'axios'
import { Link } from "react-router-dom";
import UserHeader from "../../components/UserHeader";
import PlantCard from "../../components/PlantCard";

const API_URL = process.env.REACT_APP_API_URL ||'http://localhost:5005' ;

// add islogged in feature hgere

function UserProfilePage() {
  const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  const [userToView, setUserToView] = useState("")

  useEffect(()=>{
    axios.get(`${API_URL}/api/user/${user._id}`)
    .then(result=>{

      setUserToView(result.data)
      console.log('User to view is', userToView)
      console.log(userToView)
     })
  },[user._id])

  return (
    <div>
      {userToView && (<div>
    <UserHeader user={userToView}/>
    <PlantCard plants={userToView.myPlants}/>
    
    </div>)}  
    
    </div>
  )
}

export default UserProfilePage