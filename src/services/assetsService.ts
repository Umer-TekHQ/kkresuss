import axios from "axios"

const BASE_URL = "http://13.213.72.15:5000";

export const fetchAssetsService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/papolarTokens`, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
      },
    });

    const json = res.data;

    const heigher = json.heigher || json.higher || [];
    const lower = json.lower || [];

    return [...heigher, ...lower]; 
  } catch (err) {
    console.error('Error fetching assets:', err);
    return [];
  }
};
