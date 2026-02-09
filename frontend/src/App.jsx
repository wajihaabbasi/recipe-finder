import { Routes, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Navbar from "./components/NavBar";
import { RecipeProvider } from "./context/RecipeProvider";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import RecipeDetails from "./pages/RecipeDetails";

function App() {
    return (
    <RecipeProvider>
      <BrowserRouter>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/recipe/:id/information" element={<RecipeDetails />} />
          </Routes>
        </main>
      </BrowserRouter>
    </RecipeProvider>
  );
}

export default App;


