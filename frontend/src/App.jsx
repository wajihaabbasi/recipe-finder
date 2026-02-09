import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/NavBar";
import { RecipeProvider } from "./context/RecipeProvider";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
    return (
    <RecipeProvider>
      <BrowserRouter>
        <Navbar />
        <main className="min-h-[calc(100vh-64px)]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/recipe/:id/information" element={<RecipeDetails />} />
            <Route path="*" element={<div className="text-accent font-bold text-center py-20">Page Not Found</div>} />
          </Routes>
        </main>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;


