import axios, { isAxiosError } from "axios";

const BASE_URL = "http://13.213.72.15:5000";

export const getTokenDetails = async (contractAddress: string) => {
  try {
    const url = `${BASE_URL}/tokenDetail/${contractAddress}`;
    console.log(`Fetching token details from: ${url}`);
    console.log(`Contract Address: ${contractAddress}`);
    
    const res = await axios.get(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      timeout: 15000,
      validateStatus: status => status >= 200 && status < 300,
    });
    
    console.log("API Response Status:", res.status);
    console.log("API Response Headers:", res.headers);
    console.log("API Response Data:", JSON.stringify(res.data, null, 2));
    
    if (!res.data) {
      throw new Error('Empty response from server');
    }
    
    return res.data;
  } catch (error: any) {
    console.error("API Error Details:", {
      message: error.message,
      code: error.code,
      response: error.response?.data,
      status: error.response?.status,
      url: error.config?.url
    });
    if (isAxiosError(error)) {
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data?.error || 'Server error';
        throw new Error(`Server Error (${status}): ${message}`);
      } else if (error.request) {
        console.error("Network Error - No response received:", error.request);
        throw new Error(`Network Error: Unable to reach the server at ${BASE_URL}. Please check your internet connection and try again.`);
      } else {
        throw new Error(`Request Error: ${error.message}`);
      }
    }
    throw new Error(error.message || 'Unknown Error occurred while fetching token details');
  }
};
