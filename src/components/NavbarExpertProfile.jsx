import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
 
function NavbarExpertProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);

  return (
    <div className="navbar-right">
        
        <div>
        <span>Hello {user && user.firstName}</span>
        </div>
        <div>
          <Link to="/expert/profile">
            <button>Profile</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          </div>
        </div>
  )
}

export default NavbarExpertProfile