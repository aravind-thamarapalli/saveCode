import axios from "axios";

const API_BASE_URL = "https://savecode-production.up.railway.app/api/snippets";

export const saveSnippet = async (data) => {
    return await axios.post(API_BASE_URL, data);
};

export const getSnippet = async (uniqueId) => {
    return await axios.get(`${API_BASE_URL}/${uniqueId}`);
};
