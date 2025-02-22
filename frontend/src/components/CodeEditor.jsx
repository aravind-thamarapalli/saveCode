import { useContext, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import CodeMirror from "@uiw/react-codemirror";
import { javascript } from "@codemirror/lang-javascript";
import { githubDark } from "@uiw/codemirror-theme-github";
import { CopyToClipboard } from "react-copy-to-clipboard";

function Snippet({ onSubmit }) {
    const { theme } = useContext(ThemeContext);
    const [code, setCode] = useState("");
    const [uniqueId, setUniqueId] = useState("");
    const [copied, setCopied] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({ uniqueId, code });
    };

    const themeClasses = theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black";
    const inputClasses = theme === "dark" ? "bg-gray-700 text-white" : "bg-gray-200 text-black";
    const editorTheme = theme === "dark" ? githubDark : "light";

    return (
        <div className={`p-6 rounded-lg shadow-lg w-full mx-auto transition-all ${themeClasses}`}>
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
            <CopyToClipboard text={code} onCopy={() => setCopied(true)}>
                <button
                    type="button"
                    className={`px-4 py-2 rounded-lg mb-4 w-full ${copied ? "bg-green-500" : "bg-purple-600"} text-white transition-colors duration-300`}
                >
                    {copied ? "Copied!" : "Copy to Clipboard"}
                </button>
            </CopyToClipboard>
            <button type="submit" onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition-colors duration-300">
                Save Code
            </button>
        </div>
    );
}

export default Snippet;
