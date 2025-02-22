import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Home from "./pages/Home";
import Snippet from "./pages/Snippet";
import Navbar from "./components/Navbar";

function App() {
    const { theme } = useTheme();

    return (
        <div className={theme === "dark" ? "dark bg-gray-900 text-white" : "bg-gray-100 text-gray-900"}>
            <Router>
                <Navbar />
                {/* Add top padding equal to navbar height */}
                <div className="container mx-auto py-8 pt-8">  
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/snippet" element={<Snippet />} />
                    </Routes>
                </div>
            </Router>
        </div>
    );
}

export default App;
