import { useState } from "react";
import axios from "axios";
import CodeEditor from "../components/CodeEditor";
import { useTheme } from "../context/ThemeContext";

function Home() {
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const { theme } = useTheme();

    const handleSubmit = async ({ uniqueId, code, language }) => {
        setLoading(true);
        try {
            const response = await axios.post("https://savecode-production.up.railway.app/api/snippets", { uniqueId, code, language });
            setMessage(response.data.message);
        } catch (error) {
            setMessage(`❌ Error saving snippet: ${error.response?.data?.message || error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={`flex flex-col items-center justify-center h-screen transition-all duration-300 
            ${theme === "dark" ? "bg-transparent text-white" : "bg-gray-100 text-black"}`}>

            {/* Main Container */}
            <div className={`w-full max-w-3xl rounded-2xl shadow-2xl border border-gray-700/20 
                backdrop-blur-lg bg-opacity-90 transition-all duration-300 
                ${theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black"}`}>

                <CodeEditor onSubmit={handleSubmit} />

                {loading && (
                    <p className="mt-4 text-lg text-center font-semibold animate-pulse">
                        Saving...
                    </p>
                )}

                {message && !loading && (
                    <p className={`mt-4 text-lg text-center font-semibold 
                        animate-pulse transition-all duration-500 
                        ${theme === "dark" ? "text-green-400" : "text-green-600"}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
}

export default Home;
