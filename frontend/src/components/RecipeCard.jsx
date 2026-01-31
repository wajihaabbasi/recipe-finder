import '../css/RecipeCard.css';
import { useRecipeContext } from '../context/RecipeContext';
import { Link, Navigate } from 'react-router-dom';

function RecipeCard({ recipe }) {
    const { user, isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
    const favorite = isFavorite(recipe.id);
    
    //
    const onFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();

        if(!user){
            alert("Login or Register Now To Save Your Favorite Recipes");
            Navigate("/login");
        }
        if (favorite) removeFromFavorites(recipe.id);
        else addToFavorites(recipe);
    }


    return (
         <div className="recipe-card">
            <Link to={`/recipe/${recipe.id}/information`} className="recipe-link">
                <div className="recipe-poster">
                    <img src={recipe.image} alt={recipe.title} />
                    <div className="recipe-info">
                        <h3>{recipe.title}</h3>
                        <p>{recipe.readyInMinutes} mins</p>
                    </div>
                </div>    
              <div className="recipe-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? "active" : ""}`} 
                        onClick={onFavoriteClick}>
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
                </Link>
            </div>
            
               
    );
}

export default RecipeCard;