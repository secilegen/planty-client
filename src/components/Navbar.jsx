import { Link} from "react-router-dom";
import { useContext } from "react";                     
import { AuthContext } from "../context/auth.context"; 
import NavbarUserProfile from "./NavbarUserProfile";
import NavbarGuest from "./NavbarGuest";
import NavbarExpertProfile from "./NavbarExpertProfile";
import Logo from "../images/PlantyLogo500-300.png"

 
function Navbar() {
  
  const { isLoggedIn, user, logOutUser, isExpert } = useContext(AuthContext);
  console.log("Logged in status",isLoggedIn)
  console.log("Expert status",isExpert)
  console.log("User is", user)
  return (
    <nav className="navbar">
      <div className="logo">
      <Link to="/">
            <img src={Logo} alt="Planty Logo" height="75px"/>
            </Link>
        </div>
      {/* <Link to="/">
        <button>Home</button>
      </Link> */}
 
      {isLoggedIn ? isExpert ? <NavbarExpertProfile/> : <NavbarUserProfile/> : <NavbarGuest/> }
 
    </nav>
  );
}
 
export default Navbar;