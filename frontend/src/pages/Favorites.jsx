import { useRecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import { Link } from "react-router-dom";

function Favorites() {
    const { user, favorites, setIsAuthModalOpen } = useRecipeContext();

     return (
        <div className="w-full p-8 box-border min-h-screen bg-white">
            {!user ? (  /*Logged Out */
                <div className="text-center py-20 px-8 bg-gray-50 rounded-3xl mt-8 max-w-2xl mx-auto border border-gray-100 shadow-sm animate-fade-in">
                    {/* Page Main Heading */}
                    <h2 className="mb-8 text-center text-4xl md:text-5xl font-heading font-bold text-primary drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
                        Your Favorites
                    </h2>

                    <p className="text-gray-500 text-lg leading-relaxed mb-8">
                        Sign in to save your favorite recipes, and sync them across all your devices.
                    </p>
                    
                    {/* Modal Button*/}
                    <button 
                        onClick={() => setIsAuthModalOpen(true)}
                        className="px-10 py-4 bg-primary text-white rounded-xl font-bold text-lg hover:scale-105 active:scale-95 transition-all shadow-lg">
                            Login or Register
                    </button>
                </div>
            ): favorites && favorites.length > 0 ? (
                /*User Logged in and has Favorites */
                <div className="text-center py-20 px-8 bg-gray-50 rounded-3xl mt-8 max-w-2xl mx-auto border border-gray-100 shadow-sm animate-fade-in"> /
                    <h2 className="mb-8 text-center text-4xl md:text-5xl font-heading font-bold text-primary drop-shadow-[2px_2px_4px_rgba(0,0,0,0.1)]">
                        Your Favorites
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-350 mx-auto">
                       {favorites.map((recipe, index) => (
                        <div 
                        key={recipe.id} 
                        className="animate-fade-in"
                        style={{animationDelay: `${index * 0.5}s`, 
                        animationDurationfillMode: 'both'}}    
                        >
                        <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                </div>    
              
            ) : (
                /* User Logged in but no favorites */
                <div className="text-center py-16 px-8 bg-white/5 rounded-xl mt-8 mb-8 max-w-150 mx-auto border border-white/10 animate-fade-in">
                  <h2 className="mb-4 text-3xl font-heading font-bold text-primary">
                        No Favorites Yet
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Start exploring recipes and heart your favorites to see them show up here!
                    </p>
                    {/* Navigation to home page*/}
                    <Link  
                        to="/" 
                        className="inline-block mt-6 px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/80 transition-colors"
                    >
                        Browse Recipes
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Favorites;