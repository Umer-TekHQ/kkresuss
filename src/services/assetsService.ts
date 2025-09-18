import axios from "axios";

const BASE_URL = "http://13.213.72.15:5000";

export const fetchAssetsService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/papolarTokens`, {
      headers: {
        Accept: "application/json",
      },
    });

    const json = res.data;

    const tokens = Array.isArray(json) ? json : [
      ...(json.heigher || json.higher || []),
      ...(json.lower || [])
    ];

    const normalize = (item: any) => ({
      token_name: item.name,
      token_symbol: item.symbol,
      token_logo: item.logo,
      price_usd: item.usdPrice,
      price_24h_percent_change: item.percentChange,
      contract_address: item.contract_address, 
    });

    return tokens.map(normalize);
  } catch (err) {
    console.error("Error fetching assets:", err);
    return [];
  }
};
