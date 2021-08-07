import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../App";
import { logout } from "../services/authService";
export default function NavbarComponent(){



  const {isLoggedIn,setLoggedIn} = useContext(UserContext);
    return (
        <>
        
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">


              { isLoggedIn && <Link className="nav-item nav-link" to="/">AddUser</Link>}
              { isLoggedIn && <Link className="nav-item nav-link" to="/show_users">ShowUsers</Link>}
              { isLoggedIn && <Link className="nav-item nav-link" to="/login" onClick={()=>{setLoggedIn(false);logout()}}>Logout</Link>}
              { ! isLoggedIn && <Link className="nav-item nav-link" to="/">Login</Link>}
              
            </div>
          </div>
          </div>
        </nav>
    
        </>

    );
}