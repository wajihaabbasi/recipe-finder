import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getRecipeById } from "../services/api";
import '../css/RecipeDetails.css';

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
        <div className="recipe-details-container">
            <img src={recipe.image} alt={recipe.title} className="detail-img" />
            <h1>{recipe.title}</h1>
            
            <div className="recipe-info">
                <span>⏱️ {recipe.readyInMinutes} mins</span>
                <span>👥 Serves {recipe.servings}</span>
            </div>

            <h3>Ingredients</h3>
            <ul>
                {recipe.extendedIngredients.map((ing) => (
                    <li key={ing.id}>{ing.original}</li>
                ))}
            </ul>

            <h3>Instructions</h3>
            {/* Spoonacular provides instructions as HTML, so we use dangerouslySetInnerHTML */}
            <div dangerouslySetInnerHTML={{ __html: recipe.instructions }} /> 
        </div>
    );
}

export default RecipeDetails;