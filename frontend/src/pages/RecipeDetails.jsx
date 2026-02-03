import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
//import '../css/RecipeDetails.css';

function RecipeDetails() {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    const loadDetails = async () => {
        try {
            console.log("1. Component mounted with ID:", id); // Check if ID exists
            const data = await getRecipeById(id);
            console.log("2. Data received from API:", data); // Check what the backend sent
            setRecipe(data);
        } catch (err) {
            console.error("3. Fetch Error:", err);
        } finally {
            setLoading(false);
        }
    };
    loadDetails();
}, [id]);


    if (loading) return <div className="loading">Gathering ingredients...</div>;
    if (!recipe) return <div className="error">Recipe Not Found :/ </div>;

    return (
        <div className="max-w-200 mx-auto my-10 p-5 md:p-10 bg-primary rounded-xl shadow-xl animate-fade-in">
            {/*Recipe Image*/}
            <img src={recipe.image} 
            alt={recipe.title} 
            className="w-full h-75 md:h-100 object-cover rounded-xl shadow-md" />

            <h1 className="mt-6 text-3xl md:text-4xl">{recipe.title}</h1>
            
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
        
            {/* Spoonacular provides instructions as HTML, so we use dangerouslySetInnerHTML */}
            <div 
            className="mt-4 leading-loose text-slate-800 prose-slate
                       [&_p]:mb-4 [&_ol]:list-decimal [&_ol]:pl-5 [&_ul]:list-disc [&_ul]:pl-5"
            dangerouslySetInnerHTML={{ __html: recipe.instructions }} 
        /> 
    </div>
);
}

export default RecipeDetails;