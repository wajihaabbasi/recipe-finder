import { createContext, useContext } from "react";
export const RecipeContext = createContext();
//To "Store" the recipe data
export const useRecipeContext = () => useContext(RecipeContext);