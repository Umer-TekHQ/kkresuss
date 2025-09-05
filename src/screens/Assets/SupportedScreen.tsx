import React, { useState,useRef  } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
} from 'react-native';
import AllAssetsList from '../../components/AllAssetsList';
import AssetsHeader from '../../components/AssetsHeader ';
import SearchBox from '../../components/SearchBox';
import BottomSheetNetwork from '../../components/BottomSheetNetwork';

const SupportedScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showSheet, setShowSheet] = useState(false);

  return (
    <View style={styles.container}> 
    <ScrollView 
    contentContainerStyle={{ flexGrow: 1 }}
    >
      <AssetsHeader title="Supported" showRightIcons={true} 
        onRightPress={() => setShowSheet(true)}
      />

        <View style={{marginTop:5, marginHorizontal: 6}}>
         <SearchBox value={searchText} onChangeText={setSearchText} placeholder="Search"  onClear={() => setSearchText('')}  />
      </View>

      <View style={styles.assetsList}>
        <AllAssetsList showAll searchText={searchText} />
      </View>
      
    </ScrollView>
      <BottomSheetNetwork visible={showSheet} onClose={() => setShowSheet(false)} />
    </View>
  );
};

export default SupportedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01021D',
    paddingHorizontal:16,
  },
  assetsList: {
    marginTop: 8,
  },
});
