import { useState, useEffect } from "react";
import {getRecipes} from "../services/api";
import RecipeCard from "../components/RecipeCard";
import "../css/Home.css"

function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // This runs ONCE when the component mounts (starts up)
    useEffect(() => {
        loadRecipes();
    }, []);
    
    const loadRecipes = async (query) => {
        try {
            setLoading(true);
            setError(null); //clear previous errors
            const data = await getRecipes(query);
            setRecipes(data);
        } catch (err) {
            console.error(err);
            setError("Failed to fetch recipes...");
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        loadRecipes(searchQuery);
    };

    if (loading) return <div className="loading">Loading...</div>;

    return (
        <div className="home">
             
            <form onSubmit={handleSearch} className="search-form">
                <input 
                    type="text" 
                    placeholder="Search for recipes..." 
                    className="search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="search-button">Search</button>
            </form>

            {error && <div className="error-message">{error}</div>}

            {loading ? (
                <div className="loading">Loading...</div>
            ) : (
                <div className="recipes-grid">
                    {Array.isArray(recipes) && recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;