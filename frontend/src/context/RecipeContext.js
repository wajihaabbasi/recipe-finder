import { createContext, useContext } from "react";
export const RecipeContext = createContext();

export const useRecipeContext = () => useContext(RecipeContext);