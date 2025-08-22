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



const AssetDetailScreen = () => {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [assetData, setAssetData] = useState<any>(null);

  useEffect(() => {
    setTimeout(() => {
      setAssetData(mockAssetData);
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return<AssetDetailSkeleton data={mockAssetData} onBack={() => navigation.goBack()} />
  }

  return (
    <FlatList
      style={styles.container}
      data={assetData.transactions}
      keyExtractor={(item) => item.id.toString()}
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
        </View>
      }
    />
  );
};


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
  }
});
