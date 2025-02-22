import mongoose from "mongoose";

const snippetSchema = new mongoose.Schema({
    uniqueId: { type: String, required: true, unique: true },
    code: { type: String, required: true },
    language: { type: String, required: true }
});

const Snippet = mongoose.model("Snippet", snippetSchema);
export default Snippet;
