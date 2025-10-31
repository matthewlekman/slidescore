import axios from 'axios';
const API_BASE_URL = 'http://localhost:8000/api';

export async function analyzePresentation(file) {
    const formData = new FormData();
    formData.append("ppt", file);

    try {
        const response = await axios.post(`${API_BASE_URL}/analyse`, formData);
        return response.data;
    } catch (error) {
        console.error("API error: ", error);
        throw error;
    }
}
