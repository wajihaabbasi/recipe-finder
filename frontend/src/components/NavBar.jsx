import { useNavigate, Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
import  "../css/NavBar.css"


function Navbar() {
const { user, logout } = useRecipeContext();
const navigate =useNavigate();

//Navigates to login page when logging out
const handleLogout = () => {
  logout();
  navigate("/login");
}

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <Link to="/" className="nav-link"> Recipe App </Link>
      </div>
      <div className="navbar-links">
        <Link to="/ " className="nav-link">Home</Link>

        {user ? (
          <>
        <Link to="/favorites" className="nav-link">Favorites</Link>
                        <span className="welcome-text">Hi, {user.username}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
        ) : (            
                <>
                   <Link to="/login" className="nav-link">Login</Link>
                    <Link to="/signup" className="nav-link">Sign Up</Link>
                 </>
            )}
      </div>
    </nav>
  );
}

export default Navbar;