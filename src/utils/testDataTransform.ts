// Test file to verify data transformation works correctly
import { transformTokenDetailsResponse } from './dataTransform';

// Test with the API response you provided
const testApiResponse = {
  "name": "Brett",
  "symbol": "brett",
  "contract_address": "0x532f27101965dd16442e59d40670faf5ebb142e4",
  "circulating_supply": 9909849664.52983,
  "total_supply": 9909849664.52983,
  "image": "https://coin-images.coingecko.com/coins/images/35529/small/1000050750.png?1709031995",
  "maxSupply": 9999998988,
  "Holders": 872619
};

export const testDataTransformation = () => {
  console.log('=== Testing Data Transformation ===');
  console.log('Input API Response:', testApiResponse);
  
  const transformedData = transformTokenDetailsResponse(testApiResponse);
  
  console.log('Transformed Data:', transformedData);
  console.log('Token Name:', transformedData.name);
  console.log('Token Symbol:', transformedData.symbol);
  console.log('Token Image:', transformedData.image);
  console.log('Holders (formatted):', transformedData.position.holders);
  console.log('Circulating Supply (formatted):', transformedData.position.circulatingSupply);
  console.log('Max Supply (formatted):', transformedData.position.maxSupply);
  console.log('================================');
  
  return transformedData;
};
