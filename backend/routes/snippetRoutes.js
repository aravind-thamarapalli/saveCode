import express from "express";
import Snippet from "../models/Snippet.js";

const router = express.Router();

// 📌 Save Snippet
router.post("/", async (req, res) => {
    const { uniqueId, code, language } = req.body;

    if (!uniqueId || !code || !language) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const snippet = new Snippet({ uniqueId, code, language });
        await snippet.save();
        res.status(201).json({ message: "Snippet saved successfully", snippet });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 📌 Update Snippet
router.put("/:uniqueId", async (req, res) => {
    const { code, language } = req.body;

    if (!code || !language) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        let snippet = await Snippet.findOne({ uniqueId: req.params.uniqueId });

        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        // ✅ Update existing snippet
        snippet.code = code;
        snippet.language = language;
        await snippet.save();
        res.json({ message: "Snippet updated successfully", snippet });
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

// 📌 Get Snippet by Unique ID
router.get("/:uniqueId", async (req, res) => {
    try {
        const snippet = await Snippet.findOne({ uniqueId: req.params.uniqueId });

        if (!snippet) {
            return res.status(404).json({ message: "Snippet not found" });
        }

        res.json(snippet);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;
