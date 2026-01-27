import { useRecipeContext } from "../context/RecipeContext";
import RecipeCard from "../components/RecipeCard";
import "../css/Favorites.css";

function Favorites() {
    const { favorites } = useRecipeContext();

    if (favorites.length > 0) {
        return (
            <div className="favorites">
                <h2>Your Favorites</h2>
                <div className="recipes-grid">
                    {favorites.map((recipe) => (
                        <RecipeCard recipe={recipe} key={recipe.id} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="favorites-empty">
            <h2>No Favorite Recipes Yet</h2>
            <p>Start adding recipes to your favorites and they will appear here!</p>
        </div>
    );
}

export default Favorites;