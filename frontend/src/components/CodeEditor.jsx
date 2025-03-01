import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";

function Snippet({ onSubmit }) {
    const { theme } = useContext(ThemeContext);
    const [code, setCode] = useState("");
    const [uniqueId, setUniqueId] = useState("");
    const [language, setLanguage] = useState("javascript");

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ uniqueId, code, language });
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            alert("Code copied to clipboard!");
        } catch (err) {
            alert("Failed to copy code to clipboard.");
        }
    };

    const themeClasses =
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
    const inputClasses =
        theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black";
    const editorTheme = theme === "dark" ? githubDark : "light";

    return (
        <div
            className={`p-6 rounded-lg shadow-lg w-full mx-auto transition-all ${themeClasses}`}
        >
            <input
                type="text"
                className={`w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputClasses}`}
                placeholder="Enter Unique ID"
                value={uniqueId}
                onChange={(e) => setUniqueId(e.target.value)}
                required
            />
            <CodeMirror
                value={code}
                height="300px"
                theme={editorTheme}
                extensions={[javascript()]}
                onChange={(value) => setCode(value)}
                className="mb-4 border rounded-0"
            />
            <select
                className={`w-full p-3 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 ${inputClasses}`}
                onChange={(e) => setLanguage(e.target.value)}
                defaultValue="javascript"
                required
            >
                <option value="javascript" key="javascript">JavaScript</option>
                <option value="python" key="python">Python</option>
                <option value="java" key="java">Java</option>
                <option value="csharp" key="csharp">C#</option>
                <option value="cpp" key="cpp">C++</option>
            </select>
            <div className="flex space-x-4">
                <button
                    onClick={handleCopy}
                    className="w-full px-4 py-2 rounded-lg bg-purple-600 text-white transition-colors duration-300"
                >
                    Copy to Clipboard
                </button>
                <button
                    type="submit"
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300"
                >
                    Save Code
                </button>
            </div>
        </div>
    );
}

export default Snippet;
