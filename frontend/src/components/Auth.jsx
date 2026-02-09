//Login and SignUp modal component

import { useState } from "react";
import { signupUser, loginUser } from "../services/api";
import { useRecipeContext } from "../context/RecipeContext";

const AuthModal = ({ isOpen, onClose }) => {
    //  Context & State
    const { login } = useRecipeContext();
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });

    if (!isOpen) return null;

    // Merged Submit Logic
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // Clear previous errors

        try {
            if (isLoginMode) {
                // Login Logic
                const data = await loginUser({ 
                    email: formData.email, 
                    password: formData.password 
                });
                login(data.user, data.token); // Save to context
            } else {
                // Signup Logic
                const result = await signupUser(formData);

               // Auto-login after signup so the user doesn't have to login manually
            if (result.user && result.token) {
                login(result.user, result.token);
            } else {
                // Fallback if your API doesn't return a token on signup
                alert("Account created! Please login.");
                setIsLoginMode(true);
                return;
                }
            }

            onClose(); // Close modal on success
        } catch (err) {
            setError(err.response?.data?.error || err.message || "Action failed");
        }
    };


//Auth diaglog box component   
    const inputClasses = "w-full p-3 rounded-lg bg-[#22312B] border border-primary/20 text-white outline-none focus:border-primary transition-all placeholder:text-gray-500";

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>

            {/* Modal Card */}
            <form 
                onSubmit={handleSubmit}
                className="relative flex w-full max-w-100 flex-col gap-4 rounded-xl bg-[#052d1e] p-10 shadow-[0_10px_25px_rgba(0,0,0,0.35)] animate-fade-in"
            >
                <button type="button" onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">✕</button>

                <h2 className="font-heading text-primary text-center text-2xl mb-2">
                    {isLoginMode ? "Login to RecipeFinder" : "Create Account"}
                </h2>

                {error && <p className="text-red-400 text-sm text-center font-medium bg-red-900/20 py-2 rounded">{error}</p>}

                {!isLoginMode && (
                    <input 
                        type="text" 
                        placeholder="Username" 
                        className={inputClasses}
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required 
                    />
                )}

                <input 
                    type="email" 
                    placeholder="Email" 
                    className={inputClasses}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                />

                <input 
                    type="password" 
                    placeholder="Password" 
                    className={inputClasses}
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                />

                <button type="submit" className="bg-primary hover:bg-primary/80 text-white font-semibold py-3 rounded-lg mt-2 shadow-lg active:scale-95 transition-all">
                    {isLoginMode ? "Login" : "Sign Up"}
                </button>

                <p className="text-center text-gray-400 text-sm mt-2">
                    {isLoginMode ? "Don't have an account?" : "Already have an account?"} 
                    <button 
                        type="button"
                        onClick={() => { setIsLoginMode(!isLoginMode); setError(""); }}
                        className="ml-1 text-primary hover:underline font-medium"
                    >
                        {isLoginMode ? "Sign Up here" : "Login here"}
                    </button>
                </p>
            </form>
        </div>
    );
};

export default AuthModal;