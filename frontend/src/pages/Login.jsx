import { useState, } from 'react';
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import "../css/SignUp.css"


const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const {login}  = useRecipeContext();
    const navigate = useNavigate();
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const data = await loginUser({ email, password }); // Use the helper
        login(data.user, data.token);
            navigate('/'); // Redirect to home after login
        } catch (err) {
            setError(err.response?.data?.error || 'Login failed. Check your credentials.');
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '50px auto' }}>
            <h2>Login to RecipeFinder</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <input 
                    type="email" placeholder="Email" 
                    value={email} onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <br />
                <input 
                    type="password" placeholder="Password" 
                    value={password} onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;


//import {loginUser} from "../services/api.js"
//import { useRecipeContext } from '../context/RecipeContext.js';
//import "../css/SignUp.css"