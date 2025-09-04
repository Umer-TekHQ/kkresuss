import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList,Text, } from 'react-native';
import { mockAssetData } from '../../mock/mockData';
import PriceHeader from '../../components/PriceHeader'
import ChartSection from '../../components/ChartSection'
import PositionCard from '../../components/PositionCard'
import TransactionListItem from '../../components/TransactionListItem'
import { useNavigation } from '@react-navigation/native';
import AssetDetailSkeleton from '../../components/AssetDetailSkeleton';
import { TokenActionButtons } from '../../components/TokenActionButtons';
import { ContactAddress } from '../../components/ContactAddress';
import { useRoute } from '@react-navigation/native';
import { getTokenDetails } from '../../services/tokenApi';
import ApiTestComponent from '../../components/ApiTestComponent';
import { transformTokenDetailsResponse, logApiResponse } from '../../utils/dataTransform';



// const AssetDetailScreen = () => {
//   const navigation = useNavigation();
//   const [loading, setLoading] = useState(true);
//   const [assetData, setAssetData] = useState<any>(null);

//   useEffect(() => {
//     setTimeout(() => {
//       setAssetData(mockAssetData);
//       setLoading(false);
//     }, 2000);
//   }, []);

//   if (loading) {
//     return<AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />
//   }

//   return (
//     <FlatList
//       style={styles.container}
//       data={assetData.transactions}
//       keyExtractor={(item) => item.id.toString()}
//       renderItem={({ item }) => <TransactionListItem item={item} />}
//       ItemSeparatorComponent={() => <View style={styles.separator} />}
//       ListHeaderComponent={
//         <View>
//           <PriceHeader data={assetData} onBack={() => navigation.goBack()} />
//           <ChartSection />
//           <TokenActionButtons />
//           <PositionCard data={assetData} />
//           <ContactAddress />
//           <Text style={styles.title}>Recent Transactions</Text>
//           <View style={styles.divider} />
//         </View>
//       }
//     />
//   );
// };


const AssetDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contractAddress } = route.params as { contractAddress: string };

  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setError(null);
        console.log("Fetching token details for:", contractAddress);
        
        const data = await getTokenDetails(contractAddress);
        logApiResponse(data, 'tokenDetail');
        
        if (data) {
          const transformedData = transformTokenDetailsResponse(data);
          console.log("Transformed Data:", transformedData);
          setAssetData(transformedData);
        } else {
          setError("No data received from API");
        }
      } catch (error) {
        console.error("Error fetching token details:", error);
        setError("Failed to fetch token details");
        setAssetData(mockAssetData);
      } finally {
        setLoading(false);
      }
    };

    if (contractAddress) {
      fetchDetails();
    } else {
      setError("No contract address provided");
      setLoading(false);
    }
  }, [contractAddress]);

  if (loading) {
    return <AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />;
  }

  if (error && !assetData) {
    return (
      <View style={styles.container}>
        <PriceHeader data={mockAssetData} onBack={() => navigation.goBack()} />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
          <ApiTestComponent />
        </View>
      </View>
    );
  }

  const transactions = assetData?.transactions || [];

  console.log("AssetDetailScreen Render:", {
    loading,
    error,
    hasAssetData: !!assetData,
    transactionsCount: transactions.length,
    contractAddress
  });

  return (
    <FlatList
      style={styles.container}
      data={transactions}
      keyExtractor={(item, index) => item?.id?.toString() || index.toString()}
      renderItem={({ item }) => <TransactionListItem item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View>
          <PriceHeader data={assetData} onBack={() => navigation.goBack()} />
          <ChartSection />
          <TokenActionButtons />
          <PositionCard data={assetData} />
          <ContactAddress />
          <Text style={styles.title}>Recent Transactions</Text>
          <View style={styles.divider} />
          {/* <View style={styles.debugContainer}>
            <Text style={styles.debugText}>Debug Info:</Text>
            <Text style={styles.debugText}>Contract: {contractAddress}</Text>
            <Text style={styles.debugText}>Has Data: {assetData ? 'Yes' : 'No'}</Text>
            <Text style={styles.debugText}>Transactions: {transactions.length}</Text>
          </View> */}
        </View>
      }
    />
  );
};

export default AssetDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#010D2A' },
  title: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 16,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  separator: {
    height: 1,
    backgroundColor: '#222',
    marginHorizontal: 16,
  },
  divider:{
    height:1,
    marginHorizontal:16,
    backgroundColor:'#0734A9'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff6b6b',
    fontSize: 16,
    textAlign: 'center',
  },
  debugContainer: {
    backgroundColor: '#1a1a1a',
    padding: 10,
    margin: 10,
    borderRadius: 5,
  },
  debugText: {
    color: '#00ff00',
    fontSize: 12,
    fontFamily: 'monospace',
  }
});
