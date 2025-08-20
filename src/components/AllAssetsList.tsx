
import React from 'react';
import { View, StyleSheet ,TouchableOpacity,Text} from 'react-native';
import PopularAssetItem from './PopularAssetItem';
import { allAssets } from '../mock/assetData';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../navigators/routeNames';

type AllAssetsListProps = {
  showAll?: boolean;
  searchText?: string;
};

const AllAssetsList: React.FC<AllAssetsListProps> = ({ showAll = false, searchText = '' }) => {
   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const filteredAssets = allAssets.filter(asset =>
    asset.title.toLowerCase().includes(searchText.toLowerCase()) ||
    asset.amountETH.toLowerCase().includes(searchText.toLowerCase())
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
          onPress={() => navigation.navigate('TokenDetail')}
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
    backgroundColor: '#080C4C',
    marginVertical: 8,
      marginLeft: 68,
  },
    emptyContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  emptyText: {
    color: '#ADD2FD',
    fontSize: 14,
  },
});
