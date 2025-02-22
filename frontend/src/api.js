import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/snippets";

export const saveSnippet = async (data) => {
    return await axios.post(API_BASE_URL, data);
};

export const getSnippet = async (uniqueId) => {
    return await axios.get(`${API_BASE_URL}/${uniqueId}`);
};
