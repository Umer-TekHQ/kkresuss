import axios from "axios";
const BASE_URL = "https://b6c6b36ecd9d.ngrok-free.app";

export const getTokenDetails = async (contractAddress: string) => {
  try {
   const res= await axios.get(`${BASE_URL}/token/${contractAddress}`,{
    headers:{
      Accept:"application/json"
    }
   });
  return res.data;
  } catch (error) {
    console.error("API Error (getTokenDetails):", error);
    throw error;
  }
};
