// import React, { useState, useEffect } from 'react';
// import { View, StyleSheet, FlatList,Text, } from 'react-native';
// import { mockAssetData } from '../../mock/mockData';
// import PriceHeader from '../../components/PriceHeader'
// import ChartSection from '../../components/ChartSection'
// import PositionCard from '../../components/PositionCard'
// import TransactionListItem from '../../components/TransactionListItem'
// import { useNavigation } from '@react-navigation/native';
// import AssetDetailSkeleton from '../../components/AssetDetailSkeleton';
// import { TokenActionButtons } from '../../components/TokenActionButtons';
// import { ContactAddress } from '../../components/ContactAddress';
// import { useRoute } from '@react-navigation/native';
// import { getTokenDetails } from '../../services/tokenApi';

// // const AssetDetailScreen = () => {
// //   const navigation = useNavigation();
// //   const [loading, setLoading] = useState(true);
// //   const [assetData, setAssetData] = useState<any>(null);

// //   useEffect(() => {
// //     setTimeout(() => {
// //       setAssetData(mockAssetData);
// //       setLoading(false);
// //     }, 2000);
// //   }, []);

// //   if (loading) {
// //     return<AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />
// //   }

// //   return (
// //     <FlatList
// //       style={styles.container}
// //       data={assetData.transactions}
// //       keyExtractor={(item) => item.id.toString()}
// //       renderItem={({ item }) => <TransactionListItem item={item} />}
// //       ItemSeparatorComponent={() => <View style={styles.separator} />}
// //       ListHeaderComponent={
// //         <View>
// //           <PriceHeader data={assetData} onBack={() => navigation.goBack()} />
// //           <ChartSection />
// //           <TokenActionButtons />
// //           <PositionCard data={assetData} />
// //           <ContactAddress />
// //           <Text style={styles.title}>Recent Transactions</Text>
// //           <View style={styles.divider} />
// //         </View>
// //       }
// //     />
// //   );
// // };


// const AssetDetailScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const { contractAddress } = route.params as { contractAddress: string }; // 👈 param receive yahan

//   const [loading, setLoading] = useState(true);
//   const [assetData, setAssetData] = useState<any>(null);

//   useEffect(() => {
//     const fetchDetails = async () => {
//       try {
//         const data = await getTokenDetails(contractAddress); // 👈 yahan call
//         setAssetData(data);
//       } catch (error) {
//         console.log("Error fetching token details:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchDetails();
//   }, [contractAddress]);

//   if (loading) {
//     return <AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />;
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

// export default AssetDetailScreen;

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: '#010D2A' },
//   title: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: '600',
//     marginTop: 16,
//     marginHorizontal: 16,
//     marginBottom: 12,
//   },
//   separator: {
//     height: 1,
//     backgroundColor: '#222',
//     marginHorizontal: 16,
//   },
//   divider:{
//     height:1,
//     marginHorizontal:16,
//     backgroundColor:'#0734A9'
//   }
// });

import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native';
import { mockAssetData } from '../../mock/mockData';
import PriceHeader from '../../components/PriceHeader';
import ChartSection from '../../components/ChartSection';
import PositionCard from '../../components/PositionCard';
import TransactionListItem from '../../components/TransactionListItem';
import AssetDetailSkeleton from '../../components/AssetDetailSkeleton';
import { TokenActionButtons } from '../../components/TokenActionButtons';
import { ContactAddress } from '../../components/ContactAddress';
import { useNavigation, useRoute } from '@react-navigation/native';
import { getTokenDetails } from '../../services/tokenApi';

const AssetDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contractAddress } = route.params as { contractAddress: string };

  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDetails = async () => {
      // Validate contract address
      if (!contractAddress) {
        console.error('No contract address provided');
        setError('No contract address provided');
        setLoading(false);
        return;
      }

      try {
        console.log('Fetching token details for:', contractAddress);
        console.log('API URL:', `http://13.213.72.15:5000/tokenDetail/${contractAddress}`);
        
        const data = await getTokenDetails(contractAddress);
        console.log('Raw API Response:', JSON.stringify(data, null, 2));

        // Validate API response structure
        if (!data) {
          throw new Error('Empty response from API');
        }

        // Fallback if API response is missing keys
        const safeData = {
          transactions: data.transactions || [],
          position: data.position || {},
          name: data.name || 'Unknown Token',
          symbol: data.symbol || 'UNK',
          price: data.price || 0,
          priceChange: data.priceChange || 0,
          ...data,
        };

        console.log('Processed assetData:', safeData);
        setAssetData(safeData);
        setError(null);
      } catch (error: any) {
        console.error('Error fetching token details:', error);
        console.error('Error details:', {
          message: error.message,
          stack: error.stack,
          contractAddress
        });
        
        setError(error.message || 'Failed to fetch token details');
        
        console.log('Using mock data as fallback');
        setAssetData(mockAssetData);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [contractAddress]);

  if (loading) {
    return <AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />;
  }

  if (error && !assetData) {
    return (
      <View style={styles.container}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorTitle}>Unable to Load Token Details</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity 
            style={styles.retryButton} 
            onPress={() => {
              setLoading(true);
              setError(null);
              // Re-trigger the useEffect
              const fetchDetails = async () => {
                if (!contractAddress) return;
                try {
                  const data = await getTokenDetails(contractAddress);
                  const safeData = {
                    transactions: data.transactions || [],
                    position: data.position || {},
                    name: data.name || 'Unknown Token',
                    symbol: data.symbol || 'UNK',
                    price: data.price || 0,
                    priceChange: data.priceChange || 0,
                    ...data,
                  };
                  setAssetData(safeData);
                  setError(null);
                } catch (error: any) {
                  setError(error.message || 'Failed to fetch token details');
                } finally {
                  setLoading(false);
                }
              };
              fetchDetails();
            }}
          >
            <Text style={styles.retryButtonText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.container}
      data={assetData.transactions || []} 
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      renderItem={({ item }) => <TransactionListItem item={item} />}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      ListHeaderComponent={
        <View>
          <PriceHeader data={assetData} onBack={() => navigation.goBack()} />
          <ChartSection />
          <TokenActionButtons />
          {assetData.position && <PositionCard data={assetData} />}
          <ContactAddress />
          <Text style={styles.title}>Recent Transactions</Text>
          <View style={styles.divider} />
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
  divider: {
    height: 1,
    marginHorizontal: 16,
    backgroundColor: '#0734A9',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  errorTitle: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  errorMessage: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#0734A9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  retryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
