
import React, { useState,useRef  } from 'react';
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
import BottomSheetNetwork from '../../components/BottomSheetNetwork';


interface HeaderProps {
  title: string;
  showRightIcons?: boolean;
}

const SupportedScreen = () => {
  const [searchText, setSearchText] = useState('');
  const [showSheet, setShowSheet] = useState(false);

  return (
    // before qa scrollview was the parent container 
    <View style={styles.container}> 
    <ScrollView 
    //style={styles.container}
    contentContainerStyle={{ flexGrow: 1 }}
    >
      <AssetsHeader title="Supported" showRightIcons={true} 
        onRightPress={() => setShowSheet(true)}
      />

        <View style={{marginTop:5}}>
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
   // padding: 16,
    backgroundColor: '#000',
    paddingHorizontal:16,
  },
  assetsList: {
    marginTop: 8,
  },
});
