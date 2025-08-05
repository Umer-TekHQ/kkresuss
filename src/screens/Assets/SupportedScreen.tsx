
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import AllAssetsList from '../../components/AllAssetsList';
import AssetsHeader from '../../components/AssetsHeader ';
import SearchBox from '../../components/SearchBox';
interface HeaderProps {
  title: string;
  showRightIcons?: boolean;
}

const SupportedScreen = () => {
  const [searchText, setSearchText] = useState('');

  return (
    <ScrollView style={styles.container}>
      <AssetsHeader title="Supported" showRightIcons={true} />

        <View>
         <SearchBox value={searchText} onChangeText={setSearchText} placeholder="Search" />
      </View>

      <View style={styles.assetsList}>
        <AllAssetsList showAll searchText={searchText} />
      </View>
    </ScrollView>
  );
};

export default SupportedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
   // padding: 16,
    backgroundColor: '#000',
    paddingHorizontal:16,
  },
  assetsList: {
    marginTop: 8,
  },
});
