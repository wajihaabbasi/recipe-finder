import { useEffect, useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import { getRecipeById } from "../services/api";
import { useRecipeContext } from '../context/RecipeContext';
import setModalOpen from "../components/Auth"

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const { user, isFavorite, addToFavorites, removeFromFavorites } = useRecipeContext();
   const favorite = recipe ? isFavorite(recipe.id) : false; // only checks for recipe if recipe exists

    const onFavoriteClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if(!user){
            alert("Login or Register Now To Save Your Favorite Recipes");
           setModalOpen(true); // Open the popup instead of navigating away!
        return;
        }

        if (favorite) removeFromFavorites(recipe.id);
        else addToFavorites(recipe);
    }

    useEffect(() => {
        const loadDetails = async () => {
            try {
                const data = await getRecipeById(id);
                setRecipe(data);
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        };
        loadDetails();
    }, [id]);

    //Error-Console Messages

    //
   if (loading) return (
        <div className="flex justify-center items-center h-screen text-primary font-heading animate-pulse">
            Gathering ingredients...
        </div>
    );

    if (!recipe) return (
        <div className="flex justify-center items-center h-screen text-red-500 font-heading">
            Recipe Not Found :/
        </div>
    );

    return (
        <div className="max-w-200 mx-auto my-10 p-5 md:p-10 bg-primary rounded-xl shadow-xl animate-fade-in">
        {/* Floating Favorite Button */}
        <div className="absolute top-8 right-8 z-10">
            <button 
                onClick={onFavoriteClick}
                className={`group flex h-14 w-14 items-center justify-center rounded-full shadow-2xl transition-all duration-300 active:scale-90 
                    ${favorite ? "bg-red-100" : "bg-white"}`}
            >
                <span className={`text-2xl transition-transform duration-300 group-hover:scale-125 ${favorite ? "scale-110" : "scale-100 opacity-70 group-hover:opacity-100"}`}>
                    {favorite ? "❤️" : "🤍"}
                </span>
            </button>
        </div>
            {/*Recipe Image*/}
            <img src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-75 md:h-100 object-cover rounded-xl shadow-md" />

            <h1 className="mt-6 text-3xl md:text-4xl pr-16">{recipe.title}</h1>
            
            {/* Quick Info Bar */}
        <div className="flex gap-6 my-6 font-bold text-slate-700 border-y border-black/10 py-4">
            <span className="flex items-center gap-2">⏱️ {recipe.readyInMinutes} mins</span>
            <span className="flex items-center gap-2">👥 Serves {recipe.servings}</span>
        </div>

            {/* Ingredients Section */}
        <h3 className="border-b-2 border-black/10 pb-2 mt-8 text-2xl font-heading text-slate-800">Ingredients</h3>
        <ul className="mt-4 space-y-2 list-disc list-inside text-slate-700 leading-relaxed">
            {recipe.extendedIngredients.map((ing) => (
                <li key={ing.id} className="pl-2">{ing.original}</li>
            ))}
        </ul>

            {/* Instructions Section */}
           <h3 className="border-b-2 border-black/10 pb-2 mt-10 text-2xl font-heading text-slate-800">Instructions</h3>
               
            <div 
            className="mt-4 leading-loose text-slate-800 prose-slate
                       [&_p]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"

              /* Spoonacular provides instructions as HTML, so we use dangerouslySetInnerHTML */

            dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
        /> 
    </div>
);
}

export default RecipeDetails;