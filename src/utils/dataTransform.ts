// Utility functions to transform API responses to match UI expectations

export const transformTokenDetailsResponse = (apiResponse: any) => {
  // If the API response already has the expected structure, return as is
  if (apiResponse && apiResponse.transactions) {
    return apiResponse;
  }

  // Format numbers for display
  const formatNumber = (num: number | string) => {
    const numValue = typeof num === 'string' ? parseFloat(num) : num;
    if (isNaN(numValue)) return '0';
    
    if (numValue >= 1e9) {
      return (numValue / 1e9).toFixed(2) + 'B';
    } else if (numValue >= 1e6) {
      return (numValue / 1e6).toFixed(2) + 'M';
    } else if (numValue >= 1e3) {
      return (numValue / 1e3).toFixed(2) + 'K';
    } else {
      return numValue.toFixed(2);
    }
  };

  // Transform the API response to match the expected structure
  const transformedData = {
    name: apiResponse?.name || apiResponse?.token_name || 'Unknown Token',
    symbol: apiResponse?.symbol || apiResponse?.token_symbol || 'UNKNOWN',
    price: apiResponse?.price_usd || apiResponse?.price || '0',
    priceChange: apiResponse?.price_24h_percent_change 
      ? `${apiResponse.price_24h_percent_change}%` 
      : '0%',
    time: new Date().toLocaleTimeString(),
    buyersPercent: 76, // Default values since API doesn't provide these
    sellersPercent: 24,
    // Token image from API
    image: apiResponse?.image || apiResponse?.token_logo || null,
    position: {
      value: apiResponse?.price_usd || '0',
      todayReturn: '0', // API doesn't provide this
      todayReturnPercent: apiResponse?.price_24h_percent_change || '0',
      yearHigh: '0', // API doesn't provide this
      yearHighPercent: '0',
      quantityOwned: '0', // API doesn't provide this
      holders: formatNumber(apiResponse?.Holders || apiResponse?.holders || 0),
      circulatingSupply: formatNumber(apiResponse?.circulating_supply || apiResponse?.circulatingSupply || 0),
      maxSupply: formatNumber(apiResponse?.maxSupply || apiResponse?.total_supply || 0),
    },
    // Create mock transactions since API doesn't provide transaction history
    transactions: [
      {
        id: 1,
        title: 'Token Transfer',
        type: 'Received',
        amountUSD: `+$${apiResponse?.price_usd || '0'}`,
        amountETH: `+1.0 ${apiResponse?.symbol || apiResponse?.token_symbol || 'TOKEN'}`,
        time: '1h ago',
      },
      {
        id: 2,
        title: 'Token Purchase',
        type: 'Sent',
        amountUSD: `-$${apiResponse?.price_usd || '0'}`,
        amountETH: `-0.5 ${apiResponse?.symbol || apiResponse?.token_symbol || 'TOKEN'}`,
        time: '2h ago',
      },
    ],
    // Include original API data for reference
    originalData: apiResponse,
  };

  return transformedData;
};

export const logApiResponse = (response: any, endpoint: string) => {
  console.log(`=== API Response from ${endpoint} ===`);
  console.log('Full Response:', JSON.stringify(response, null, 2));
  console.log('Response Type:', typeof response);
  console.log('Response Keys:', response ? Object.keys(response) : 'No response');
  console.log('================================');
};
