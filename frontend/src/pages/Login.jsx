import { useState, } from 'react';
import { useRecipeContext } from "../context/RecipeContext";
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/api';
import "../css/Login.css"


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
        <div className="auth-container" flex justify-center items-center min-h-screen>           
            <form className= "login-form" onSubmit={handleSubmit}>
               <h2>Login to RecipeFinder</h2>
                {error && <p className="error-message" style={{color: 'red'}}>{error}</p>} 
                <input 
                    type="email" 
                    placeholder="Email" 
                    value={FormData.email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <br />
                <input 
                    type="password" 
                    placeholder="Password" 
                    value={FormData.password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <br />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
