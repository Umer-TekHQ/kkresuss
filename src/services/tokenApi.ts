import axios from "axios";
const BASE_URL = "http://13.213.72.15:5000";

export const getTokenDetails = async (contractAddress: string) => {
  try {
    console.log(`Making API call to: ${BASE_URL}/tokenDetail/${contractAddress}`);
    
    const res = await axios.get(`${BASE_URL}/tokenDetail/${contractAddress}`, {
      headers: {
        Accept: "application/json"
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log("API Response Status:", res.status);
    console.log("API Response Data:", res.data);
    
    return res.data;
  } catch (error) {
    console.error("API Error (getTokenDetails):", error);
    
    if (axios.isAxiosError(error)) {
      if (error.response) {
        // Server responded with error status
        console.error("Response Error:", error.response.status, error.response.data);
        throw new Error(`API Error: ${error.response.status} - ${error.response.data?.message || 'Unknown error'}`);
      } else if (error.request) {
        // Request was made but no response received
        console.error("Network Error:", error.request);
        throw new Error('Network Error: Unable to reach the server');
      }
    }
    
    throw error;
  }
};
