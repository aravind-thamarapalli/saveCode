import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { ThemeContext } from "../context/ThemeContext";
import { useNavigate } from "react-router-dom";

function Snippet() {
  const [uniqueId, setUniqueId] = useState("");
  const [snippet, setSnippet] = useState(null);
  const [editedCode, setEditedCode] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();

  const fetchSnippet = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://savecode-production.up.railway.app/api/snippets/${uniqueId}`
      );
      setSnippet(response.data);
      setEditedCode(response.data.code);
      setLanguage(response.data.language);
    } catch (error) {
      toast.error("Snippet not found!");
    } finally {
      setLoading(false);
    }
  };

  const updateSnippet = async () => {
    setLoading(true);
    try {
      await axios.put(
        `https://savecode-production.up.railway.app/api/snippets/${uniqueId}`,
        {
          code: editedCode,
          language,
        }
      );
      toast.success("Snippet updated successfully!");
      alert("Snippet updated successfully!");
      navigate("/");
    } catch (error) {
      toast.error("Failed to update snippet.");
    } finally {
      setLoading(false);
    }
  };

  const editorTheme = theme === "dark" ? githubDark : "light";
  const themeClasses =
    theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black";
  const inputClasses =
    theme === "dark"
      ? "bg-gray-800 text-white border-gray-600"
      : "bg-gray-100 text-black border-gray-300";

return (
    <div
        className={`min-h-screen flex flex-col items-center justify-center ${themeClasses}`}
    >
        <div className="max-w-2xl w-full p-6 rounded-lg shadow-lg transition-all border border-gray-700/20">
            <h2 className="text-2xl font-bold mb-6 text-center tracking-wide">
                🔥 Code Snippet Viewer
            </h2>

            {/* Unique ID Input */}
            <input
                type="text"
                className={`w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-purple-500 transition-all ${inputClasses}`}
                placeholder="Enter Unique ID"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
            />

            {/* Get Snippet Button */}
            <button
                onClick={fetchSnippet}
                className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-4 py-3 rounded-lg mb-6 text-lg font-semibold shadow-md transform hover:scale-105 transition-all duration-300"
            >
                🚀 Get Snippet
            </button>

            {loading && <div className="text-center mb-6">Loading...</div>}

            {snippet && !loading && (
                <div>
                    {/* Code Editor */}
                    <CodeMirror
                        value={editedCode}
                        height="300px"
                        theme={editorTheme}
                        extensions={[javascript()]}
                        onChange={(value) => setEditedCode(value)}
                        className="border rounded-lg"
                    />

                    {/* Language Selector */}
                    <select
                        className={`w-full p-3 border rounded-lg mt-4 focus:ring-2 focus:ring-purple-500 transition ${inputClasses}`}
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                    >
                        <option value="javascript">JavaScript</option>
                        <option value="python">Python</option>
                        <option value="java">Java</option>
                        <option value="cpp">C++</option>
                    </select>

                    <div className="flex justify-between mt-4">
                        {/* Copy to Clipboard */}
                        <button
                            onClick={() => navigator.clipboard.writeText(editedCode)}
                            className="px-4 py-2 rounded-lg bg-purple-600 text-white transition-colors duration-300"
                        >
                            Copy to Clipboard
                        </button>

                        {/* Update Snippet Button */}
                        <button
                            onClick={updateSnippet}
                            className="px-4 py-2 rounded-lg bg-gradient-to-r from-green-500 to-teal-600 text-white transition-colors duration-300"
                        >
                            ✅ Update Snippet
                        </button>
                    </div>
                </div>
            )}
        </div>
    </div>
);
}

export default Snippet;
