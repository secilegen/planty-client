import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
 
function NavbarExpertProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar-right">
        
        <div className="navbar-right-top">
        <span>Hello {user && user.firstName}</span>
        </div>
        <div className="navbar-right-bottom">
          
          <Link to="/expert/profile">
            <button className="navbar-button">Profile</button>
          </Link>        
          <button className="navbar-button" onClick={logOutUser}>Logout</button>
          </div>
        </div>
  )
}

export default NavbarExpertProfile