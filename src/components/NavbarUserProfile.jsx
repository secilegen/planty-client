import { Link } from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
 
function NavbarUserProfile() {
    const { isLoggedIn, user, logOutUser } = useContext(AuthContext);
  return (
    <div className="navbar-right">
            {/* profile page yet to be created */}
          <Link to="/profile">
            <button>Profile</button>
          </Link>        
          <button onClick={logOutUser}>Logout</button>
          <span>{user && user.firstName}</span>

        </div>
  )
}

export default NavbarUserProfile