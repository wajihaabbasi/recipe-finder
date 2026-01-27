import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/SignUp.css"
import {signupUser} from "../services/api"

console.log("Signup function check:", signupUser);

function Signup() {
    const [formData, setFormData] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

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
        <div className="auth-container">
            <form className="auth-form" onSubmit={handleSubmit}>
                <h2>Create Account</h2>
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>}
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={formData.username}
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                    required 
                />
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    required 
                />
                <button type="submit" className="auth-btn">Sign Up</button>
                <p>Already have an account? <Link to="/login">Login here</Link></p>
            </form>
        </div>
    );
}

export default Signup;