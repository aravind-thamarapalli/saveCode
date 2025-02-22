import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <nav className={`fixed w-full top-0 z-50 p-4 shadow-md ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-xl font-bold">Code Snippet App</h1>
                <div>
                    <a href="/" className="mr-4 hover:underline">Home</a>
                    <a href="/snippet" className="hover:underline">Snippet</a>
                </div>
                <button 
                    onClick={toggleTheme} 
                    className="px-4 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
                >
                    {theme === "dark" ? "Light Mode 🌞" : "Dark Mode 🌙"}
                </button>
            </div>
        </nav>
    );
}

export default Navbar;
