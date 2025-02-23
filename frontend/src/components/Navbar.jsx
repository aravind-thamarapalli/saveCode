import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

function Navbar() {
    const { theme, setTheme } = useContext(ThemeContext);

    const toggleTheme = () => {
        setTheme(theme === "dark" ? "light" : "dark");
    };

    return (
        <nav className={`fixed w-full top-0 z-50 p-4 shadow-md transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-extrabold tracking-wide">Save-Code</h1>
                <div className="space-x-4">
                    <a href="/" className="no-underline hover:text-indigo-500 transition-colors duration-300">Home</a>
                    <a href="/snippet" className="no-underline hover:text-indigo-500 transition-colors duration-300">Snippet</a>
                </div>
                <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" className="sr-only peer" onChange={toggleTheme} checked={theme === "dark"} />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-indigo-300 dark:peer-focus:ring-indigo-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                    </label>
                    <span className="ml-2">{theme === "dark" ? "🌙" : "☀️"}</span>
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
