//import '../css/RecipeCard.css';
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
         <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-secondary transition-transform duration-200 hover:-translate-y-1 shadow-lg">
            <Link to={`/recipe/${recipe.id}/information`} className="recipe-link">
                <div className="relative aspect-6/4 w-full">
                    <img 
                    src={recipe.image}
                    alt={recipe.title} 
                    className='h-full w-full object-cover'
                    />
                    <div className="p-7 font-heading text-lg font-semibold line-clamp-2">
                        <h3>{recipe.title}</h3>
                     </div>
                </div>    
              <div className="absolute top-0 right-0 p-2.5 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    <button 
                        className={`flex h-8.75 w-8.75 items-center justify-center rounded-full bg-secondary shadow-md transition-transform hover:scale-110 active:scale-90 ${favorite ? "text-red-500" : "text-gray-400"}`}
                        onClick={onFavoriteClick}>
                        {favorite ? "❤️" : "🤍"}
                    </button>
                </div>
                </Link>
            </div>
            
               
    );
}

export default RecipeCard;