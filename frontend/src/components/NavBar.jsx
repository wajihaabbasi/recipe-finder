import { Link } from "react-router-dom";
import { useRecipeContext } from "../context/RecipeContext";
import { useState } from "react";
import AuthModal from "./Auth";

/**
 * Navbar Component
 * Handles navigation links, authentication modal triggers, and user profile dropdown.
 */
const Navbar = () => {
    const { user, logout, isAuthModalOpen, setIsAuthModalOpen} = useRecipeContext(); 
    const [isDropdownOpen, setIsDropdownOpen] = useState(false); //for menu dropdown when logged in

    return (
        <nav className="flex items-center justify-between bg-primary px-4 py-4 text-white shadow-lg md:px-8 border-b border-white/5">
            {/* Logo Section */}
            <div className="font-heading text-xl font-bold tracking-tight md:text-2xl">
                <Link to="/" className="transition-colors hover:text-accent">
                    Recipe Finder
                </Link>
            </div>

            {/* Main Navigation Links */}
            <div className="flex items-center gap-4 md:gap-10">
            <div className="flex gap-2 md:gap-5 items-center">
                {/* Home Button*/}
                <Link to="/" 
                    className="font-heading rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 hover:text-primary hover:bg-accent md:text-base">
                    Home
                </Link>
                {/* Fav Page  Button*/}
                <Link to="/favorites" 
                    className="font-heading rounded-lg px-3 py-2 text-sm font-bold transition-all duration-200 hover:text-primary hover:bg-accent md:text-base"
                >
                    Favorites
                </Link>
            </div>

            {/* Authentication & User Dropdown */}
            <div className="flex items-center">
                {user ? (
                    <div className="relative">
                        {/* Profile Trigger Button */}
                        <button 
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center gap-2 bg-white/5 hover:bg-white/10 px-4 py-2 rounded-lg transition-all border border-white/10 group"
                        >
                            <span className="font-medium text-sm md:text-base">Hi, {user.username}</span>
                            <span className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''} text-accent`}>
                                ▾
                            </span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <>
                                {/* Click-away overlay */}
                                <div 
                                    className="fixed inset-0 z-10" 
                                    onClick={() => setIsDropdownOpen(false)}
                                ></div>

                                <div className="absolute right-0 mt-3 w-52 rounded-xl bg-primary border border-white/10 shadow-2xl z-20 overflow-hidden animate-fade-in ring-1 ring-black/5">
                                   {/* Account heading*/}
                                    <div className="px-4 py-3 border-b border-white/5">
                                        <p className="text-xs text-secondary uppercase tracking-widest font-bold">Account</p>
                                    </div>
                                    {/* Logout Button*/}
                                    <button 
                                        onClick={() => { logout(); setIsDropdownOpen(false); }}
                                        className="w-full text-left px-4 py-3 text-sm font-heading hover:bg-white/5 hover:text-accent transition-colors"
                                    >
                                        Logout
                                    </button>
                                    
                                </div>
                            </>
                        )}
                    </div>
                ) : (
                    /* Guest Action Button */
                    <button 
                        onClick={() => setIsAuthModalOpen(true)} 
                        className="font-heading bg-accent text-primary px-5 py-2 rounded-lg font-bold shadow-md hover:scale-105 active:scale-95 transition-all duration-200"
                    >
                        Join Now
                    </button>
                )}
            </div>

            {/* Modular Auth Popup */}
            <AuthModal 
                isOpen={isAuthModalOpen} 
                onClose={() => setIsAuthModalOpen(false)} 
            />
            </div>
        </nav>
    );
};

export default Navbar;