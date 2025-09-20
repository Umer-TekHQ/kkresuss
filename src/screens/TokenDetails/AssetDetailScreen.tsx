import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';

import AssetDetailError from '../../components/assetDetailError';
import AssetDetailList from '../../components/assetDetailList';
import AssetDetailSkeleton from '../../components/AssetDetailSkeleton';
import { mockAssetData } from '../../mock/mockData';
import { getTokenDetails } from '../../services/tokenApi';

const AssetDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contractAddress, name } = route.params as { contractAddress: string; name?: string };

  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchDetails = async () => {
    if (!contractAddress) {
      setError('No contract address provided');
      setLoading(false);
      return;
    }

    try {
      const data = await getTokenDetails(contractAddress);
      if (!data) throw new Error('Empty response from API');

      const safeData = {
        transactions: data.transactions || [],
        position: data.position || {},
        name: data.name || 'Unknown Token',
        symbol: data.symbol || 'UNK',
        price: data.price || 0.00,
        priceChange: data.priceChange || 0,
        contract_address: contractAddress,
        ...data,
      };

      setAssetData(safeData);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch token details');
      setAssetData(mockAssetData);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [contractAddress]);

  if (loading) {
    return <AssetDetailSkeleton data={{ name }} onBack={() => navigation.goBack()} />;
  }

  if (error && !assetData) {
    return <AssetDetailError error={error} onRetry={fetchDetails} />;
  }

  return (
    <AssetDetailList
      data={assetData}
      transactions={assetData.transactions || []}
      onBack={() => navigation.goBack()}
    />
  );
};

export default AssetDetailScreen;
