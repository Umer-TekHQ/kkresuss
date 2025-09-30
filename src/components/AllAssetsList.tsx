import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';

import PopularAssetItem from './PopularAssetItem';
import { AppNavigatorParamList } from '../navigators/routeNames';
import { fetchAssetsService } from '../services/assetsService';
import { Colors } from '../theme/colors';

type AllAssetsListProps = {
  showAll?: boolean;
  searchText?: string;
};

const AllAssetsList: React.FC<AllAssetsListProps> = ({ showAll = false, searchText = '' }) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const [assets, setAssets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      try {
        const data = await fetchAssetsService();
        setAssets(data);
      } catch (err) {
        console.error("Error loading assets:", err);
      } finally {
        setLoading(false);
      }
    };
    loadAssets();
  }, []);

  if (loading) {
    return (
        <ActivityIndicator  style={styles.indicator} size="small" />
    );
  }

  const filteredAssets = assets.filter(
    asset =>
      asset.token_name?.toLowerCase().includes(searchText.toLowerCase()) ||
      asset.token_symbol?.toLowerCase().includes(searchText.toLowerCase())
  );

  const assetsToShow = showAll ? filteredAssets : filteredAssets.slice(0, 5);

  if (assetsToShow.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>There is no item exist of this name</Text>
      </View>
    );
  }

  return (
    <>
      {assetsToShow.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            navigation.navigate('TokenDetail', {
              contractAddress: item.contract_address,
              name: item.token_name,
            })
          }
        >
          <PopularAssetItem item={item} />
          <View style={styles.divider} />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default AllAssetsList;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: Colors.kresusBlue,
    marginVertical: 8,
    marginLeft: 68,
  },
  emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: Colors.lightblue,
    fontSize: 14,
  },
  indicator:{
    paddingVertical: 20,
    color: Colors.link
  }
});
