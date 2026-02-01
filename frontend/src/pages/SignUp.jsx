import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
//import "../css/SignUp.css"
import {signupUser} from "../services/api"

console.log("Signup function check:", signupUser);

function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const inputClasses = "w-full p-3 rounded-md border border-[#2E4A3F] bg-[#22312B] text-white outline-none focus:border-[#4ade80] transition-all placeholder:text-gray-500";
    const buttonClasses = "w-full py-3 mt-2 bg-[#2E4A3F] hover:bg-[#3d6354] text-white font-semibold rounded-md transition-colors shadow-lg active:scale-[0.98]";

    const handleSubmit = async (e) => {
        e.preventDefault();
                
    try{
        const result = await signupUser(formData);    
            console.log("Success:", result);
            alert("Account created successfully!");
            navigate("/login"); // Send them to login page
        } 
        catch (err) {
            setError(err.message);
        }
    };

    

    return (
        <div className="bg-amber-950 flex justify-center items-center min-h-screen">
            <form className="flex w-full max-w-100 flex-col gap-3.75 rounded-xl bg-[#5d2235] p-10 shadow-[0_10px_25px_rgba(0,0,0,0.35)]" onSubmit={handleSubmit}>
                <h2 className="text-center mb-2">Create Account</h2>
                {error && <p className="text-red-400 text-sm text-center font-medium bg-red-900/20 py-2 rounded">{error}</p>}
                <input 
                    type="text" 
                    placeholder="Username" 
                    className={inputClasses}
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required 
                />
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
                <button type="submit" className={buttonClasses}>
                    Sign Up
                    </button>

                <p className="text-center text-gray-400 text-sm mt-2">
                    Already have an account? <Link to="/login">Login here</Link>
                    </p>
            </form>
        </div>
    );
}

export default Signup;