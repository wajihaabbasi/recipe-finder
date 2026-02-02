import { useNavigate, Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
//import  "../css/NavBar.css"


function Navbar() {
const { user, logout } = useRecipeContext();
const navigate =useNavigate();

//Navigates to login page when logging out
const handleLogout = () => {
  logout();
  navigate("/login");
}

  return (
    <nav className="flex items-center justify-between bg-primary px-4 py-4 text-white shadow-md md:px-8">
      <div className="font-heading text-xl font-bold md:text-2xl">
        <Link to="/" className="nav-link"> Recipe App </Link>
      </div>
      <div className="flex gap-4 md:gap-8">
        <Link to="/" className="rounded px-2 py-2 text-base transition-colors duration-200 hover:bg-white/10 md:px-4">Home</Link>
        {user ? (
          <>
        <Link to="/favorites" className="rounded px-2 py-2 text-base transition-colors duration-200 hover:bg-white/10 md:px-4">Favorites</Link>
                        <span className="welcome-text">Hi, {user.username}</span>
                        <button onClick={handleLogout} className="logout-btn">Logout</button>
                    </>
        ) : (            
                <>
                   <Link to="/login" className="rounded px-2 py-2 text-base transition-colors duration-200 hover:bg-white/10 md:px-4">Login</Link>
                    <Link to="/signup" className="rounded px-2 py-2 text-base transition-colors duration-200 hover:bg-white/10 md:px-4">Sign Up</Link>
                 </>
            )}
      </div>
    </nav>
  );
}

export default Navbar;