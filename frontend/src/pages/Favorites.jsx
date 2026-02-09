import { useRecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";

function Favorites() {
    const { favorites } = useRecipeContext();

     return (
        <div className="w-full p-8 box-border min-h-screen bg-slate-950">
            {favorites && favorites.length > 0 ? (
                <>
                    {/* Main Heading with Text Shadow */}
                    <h2 className="mb-8 text-center text-4xl md:text-5xl font-heading font-bold text-primary drop-shadow-[2px_2px_4px_rgba(0,0,0,0.3)]">
                        Your Favorites
                    </h2>

                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 max-w-[1400px] mx-auto">
                        {favorites.map((recipe, index) => (
                            <div 
                            key={recipe.id} 
                            className="animate-fade-in"
                            style={{animationDelay: `${index * 0.5}s`, fillMode: 'both'}}    
                            >
                                <RecipeCard recipe={recipe} />
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                /* Empty State Section */
                <div className="text-center py-16 px-8 bg-white/5 rounded-xl mt-8 mb-8 max-w-[600px] mx-auto border border-white/10 animate-fade-in">
                    
                    <h2 className="mb-4 text-3xl font-heading font-bold text-primary">
                        No Favorites Yet
                    </h2>
                    <p className="text-gray-400 text-lg leading-relaxed">
                        Start exploring recipes and heart your favorites to see them show up here!
                    </p>
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