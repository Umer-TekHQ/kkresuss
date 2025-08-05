
import React from 'react';
import { View, StyleSheet } from 'react-native';
import PopularAssetItem from './PopularAssetItem';
import { allAssets } from '../mock/assetData';

type AllAssetsListProps = {
  showAll?: boolean;
  searchText?: string;
};

const AllAssetsList: React.FC<AllAssetsListProps> = ({ showAll = false, searchText = '' }) => {
  const filteredAssets = allAssets.filter(asset =>
    asset.title.toLowerCase().includes(searchText.toLowerCase()) ||
    asset.amountETH.toLowerCase().includes(searchText.toLowerCase())
  );

  const assetsToShow = showAll ? filteredAssets : filteredAssets.slice(0, 5);

  return (
    <>
      {assetsToShow.map((item, index) => (
        <View key={index}>
          <PopularAssetItem item={item} />
          <View style={styles.divider} />
        </View>
      ))}
    </>
  );
};

export default AllAssetsList;

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: '#1E2D56',
    marginVertical: 8,
  },
});
