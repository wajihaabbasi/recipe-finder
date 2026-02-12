import { useState, useEffect } from "react";
import { RecipeContext } from "./RecipeContext";

export const RecipeProvider = ({ children }) => {
    //  Lazy Initialize User (Fixes the flicker/cascading render)
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        return (savedUser && token) ? JSON.parse(savedUser) : null;
    });
    const [userToken, setToken] = useState(() => localStorage.getItem("token") || null);

    //  Lazy Initialize Favorites
    const [favorites, setFavorites] = useState(() => {
        const storedFavs = localStorage.getItem("favorites");
        return storedFavs ? JSON.parse(storedFavs) : [];
    });

    const login = (userData, userToken) => {
        setUser(userData);
        setToken(userToken);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("token", userToken);
    };

    const logout = () => {
        setUser(null);
        setToken(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    

    // Effect to keep localStorage in sync when favorites change
    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addToFavorites = (recipe) => {
        setFavorites((prev) => [...prev, recipe]);
    };

    const removeFromFavorites = (recipeId) => {
        setFavorites((prev) => prev.filter((recipe) => recipe.id !== recipeId));
    };

    const isFavorite = (recipeId) => {
        return favorites.some((recipe) => recipe.id === recipeId);
    };

    
    const value = {
        user, 
        userToken,
        login,
        logout,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
};