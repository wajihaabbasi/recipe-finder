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
        const token = localStorage.getItem("token");
        const storedFavs = localStorage.getItem("favorites");
        return (token && storedFavs) ? JSON.parse(storedFavs) : [];
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
        setFavorites([]); //to clear the fav UI state
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("favorites"); //remove saved recipes from browser
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
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    
    const value = {
        user, 
        userToken,
        login,
        logout,
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite,
        isAuthModalOpen,
        setIsAuthModalOpen
    };

    return (
        <RecipeContext.Provider value={value}>
            {children}
        </RecipeContext.Provider>
    );
};