import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList,Text } from 'react-native';
import { mockAssetData } from '../../mock/mockData';
import PriceHeader from '../../components/PriceHeader'
import ChartSection from '../../components/ChartSection'
import PositionCard from '../../components/PositionCard'
import { SkeletonLoader } from '../../components/SkeletonLoader';
import TransactionListItem from '../../components/TransactionListItem'
import { useNavigation } from '@react-navigation/native';
import AssetDetailSkeleton from '../../components/AssetDetailSkeleton';
import { TokenActionButtons } from '../../components/TokenActionButtons';

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
          <Text style={styles.title}>Recent Transactions</Text>
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
});
