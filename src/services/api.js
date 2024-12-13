// services/api.js
import axios from 'axios';

export const fetchData = async () => {
    try {
        const response = await axios.get('http://localhost:5000/api/data');  // Your Flask API endpoint
        return response.data;
    } catch (error) {
        console.error("Error fetching data", error);
        return [];
    }
};
