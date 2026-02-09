//Recipe Display Card Componet
import { useRecipeContext } from '../context/RecipeContext';
import { Link } from 'react-router-dom';
import setModalOpen from "../components/Auth"

function RecipeCard({ recipe }) {
    const { user, isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
    const favorite = isFavorite(recipe.id);
    

    const onFavoriteClick = (e) => {
        e.preventDefault(); //Stop the browser from following a link
        e.stopPropagation(); //prevents clicking the heart from opening the whole recipe card 
        
        //Auth check if user is logged in
        if(!user){
            alert("Login or Register Now To Save Your Favorite Recipes");
           setModalOpen(true); // Open the popup 
        return;
        }
        if (favorite) removeFromFavorites(recipe.id); //if recipe was already favorite, it undos it
        else addToFavorites(recipe); //else adds it
    }


    return (
         <div className="group relative cursor-pointer overflow-hidden rounded-lg bg-secondary transition-transform duration-200 hover:-translate-y-1 shadow-lg">
            <Link to={`/recipe/${recipe.id}/information`} className="recipe-link">
                <div className="relative aspect-6/4 w-full">
                 {/*Recipe Image*/}
                    <img 
                    src={recipe.image}
                    alt={recipe.title} 
                    className='h-full w-full object-cover'
                    />
                     {/*Recipe Name*/}
                    <div className="p-5 flex flex-col space-y-2">
                         <h3 className="font-heading text-lg md:text-xl font-bold text-primary leading-tight tracking-tight group-hover:text-accent transition-colors line-clamp-2 min-h-[3.5rem]">
                             {recipe.title}
                            </h3>
                     {/*Recipe Info*/}
                    <div className="flex items-center gap-2 text-sm font-medium text-gray-400">
                        <span className="flex items-center gap-1">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                            {recipe.readyInMinutes} mins
                            </span>
                            </div>
                </div>
                </div>    
                {/*Favorite Button */}
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