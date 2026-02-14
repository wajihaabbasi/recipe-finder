import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/NavBar";
import { RecipeProvider } from "./context/RecipeProvider";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
    return (
      /* RecipeProvider: Ensures user auth and favorites data are available to every component,
         * including the Navbar and all Route elements.
         */
    <RecipeProvider>
      {/* BrowserRouter: Enables URL-based navigation without page refreshes. */}
        <BrowserRouter>
              
      {/* Fixed Navbar: Stays visible across all pages */}
      <Navbar />
      {/* Main content */}
        <main className="min-h-[calc(100vh-64px)]">
          <Routes>
            {/* Landing Page: Search and browse recipes */}
            <Route path="/" element={<Home />} />

            {/* Favorites Page: Displays user-saved recipes (Auth-protected UI) */}
            <Route path="/favorites" element={<Favorites />} />

            {/* Recipe Details: Dynamic route using Spoonacular API ID */}
            <Route path="/recipe/:id/information" element={<RecipeDetails />} />

            {/*Error boundary */}
            <Route path="*" 
            element={
            <div className="text-accent font-bold text-center py-20">Page Not Found</div>
            } 
            />
          </Routes>
        </main>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;


