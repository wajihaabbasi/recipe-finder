import { Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
import {useState} from "react";
import AuthModal from "./Auth";


const Navbar = () => {
const { user, logout } = useRecipeContext(); //Get user and logout form context
const [isModalOpen, setIsModalOpen] = useState(false);  //for auth modal for signup/login

return (
        <nav className="flex items-center justify-between bg-primary px-4 py-4 text-white shadow-md md:px-8">
            <div className="font-heading text-xl font-bold md:text-2xl">
                <Link to="/">RecipeFinder</Link>
            </div>

            <div className="flex gap-4 md:gap-8 items-center text-sm md:text-base">
                <Link to="/" className="rounded px-2 py-2 text-base font-bold transition-colors duration-200 hover:text-accent hover:bg-white/10 md:px-4">Home</Link>
                <Link to="/favorites" className="rounded px-2 py-2 text-base font-bold transition-colors duration-200 hover:text-accent hover:bg-white/10 md:px-4">Favorites</Link>
                
                {user ? (
                    /* Show this when Logged In */
                    <div className="flex items-center gap-4">
                        <span className="hidden md:block text-white/90 italic">
                            Hi, {user.username}
                        </span>
                        <button 
                            onClick={logout} // Directly calls logout
                            className="rounded px-2 py-2 text-base font-bold transition-colors duration-200 hover:text-accent hover:bg-white/10 md:px-4"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    /* Show this when Logged Out */
                    <button 
                        onClick={() => setIsModalOpen(true)}
                        className="rounded-lg px-4 py-2 font-bold transition-colors duration-200 hover:text-accent hover:bg-white/10 md:px-4"
                    >
                        Login or SignUp
                    </button>
                )}
            </div>

            <AuthModal 
                isOpen={isModalOpen} 
                onClose={() => setIsModalOpen(false)} 
            />
        </nav>
    );
};

export default Navbar;

//"rounded px-2 py-2 text-base transition-colors duration-200 hover:text-accent hover:bg-white/10 md:px-4">Favorites</Link>
//"bg-white text-primary px-4 py-2 rounded-lg font-bold hover:bg-white/90 transition-all active:scale-95