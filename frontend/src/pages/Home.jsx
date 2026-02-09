import { useState, useEffect } from "react";
import {getRecipes} from "../services/api";
import RecipeCard from "../components/RecipeCard";


function Home() {
    const [searchQuery, setSearchQuery] = useState("");
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const searchInputClasses = "flex-1 p-3 rounded-lg bg-[#22312B] border border-primary/20 text-white outline-none focus:border-primary transition-all placeholder:text-gray-500";

    // This runs once  when the component mounts (starts up)
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
 //Process search from submitted query
    const handleSearch = (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        loadRecipes(searchQuery);
    };

    
    return (
        <div className="w-full py-4 md:py-8 min-h-screen">
             {/*Search Bar*/}
            <form onSubmit={handleSearch} className="flex flex-row gap-3 max-w-150 mx-auto mb-6 md:mb-10 px-4">
                <input 
                    type="text" 
                    placeholder="Search for recipes..." 
                    className={searchInputClasses}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
                {/*Search Button*/}
                <button 
                type="submit" 
                className="px-6 py-3 bg-primary hover:bg-secondary/90 hover:text-accent text-white font-bold rounded-lg transition-all active:scale-95 shadow-lg whitespace-nowrap">
                    Search
                </button>
            </form>

            {error && (
                <div className="max-w-150 mx-auto mb-6 px-4">
            <div className="bg-red-900/20 text-red-400 p-3 rounded-lg border border-red-900/50 text-center">{error}</div>
            </div>
            )}
            {/*When Fetching Recipes */}
            {loading ? (
                <div className="flex justify-center items-center h-64 text-primary font-heading text-xl animate-pulse">
                    Wait It's Loading ...
                    </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 px-4 md:px-10 w-full max-w-350 mx-auto">
                    {Array.isArray(recipes) && recipes.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Home;