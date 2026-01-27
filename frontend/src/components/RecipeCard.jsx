import '../css/RecipeCard.css';
import { useRecipeContext } from '../context/RecipeContext';

function RecipeCard({ recipe }) {
    const { isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
    const favorite = isFavorite(recipe.id);

    function onFavoriteClick(e) {
        e.preventDefault();
        if (favorite) removeFromFavorites(recipe.id);
        else addToFavorites(recipe);
    }

    return (
        <div className="recipe-card">
            <div className="recipe-poster">
                <img src={recipe.image} alt={recipe.title} />
                <div className="recipe-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}
                    >
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
            </div>
            <div className="recipe-info">
                <h3>{recipe.title}</h3>
                <p>{recipe.readyInMinutes} mins</p>
            </div>
        </div>
    );
}

export default RecipeCard;