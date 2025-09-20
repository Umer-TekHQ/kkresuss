import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image,   } from 'react-native';
import { ImageSourcePropType } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch } from 'react-redux';

import { Images } from '../../assets'; 
import AssetsHeader from '../../components/AssetsHeader ';
import RecipientSkeleton from '../../components/RecipientSkeleton';
import SearchBox from '../../components/SearchBox';
import { recipients } from '../../mock/recipients';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { setRecipient } from '../../store/slices/recipientSlice';
import { Colors } from '../../theme/colors';

const SelectRecipient = () => {
const dispatch = useDispatch();
const [searchText, setSearchText] = useState(''); 
const [loading, setLoading] = useState(true);
 type Recipient = {
    id: string;
    name?: string;
    email?: string;
    code?: string;
    logo?: ImageSourcePropType; 
  };
const [data, setData] = useState<Recipient[]>([]);
const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  useEffect(() => {
    setTimeout(() => {
      setData(recipients);
      setLoading(false);
    }, 2500);
  }, []);

  const handleQrPress = () => navigation.navigate('QR');
  const handleClear = () => setSearchText('');
  const filteredData = data.filter((item) => {
  const searchLower = searchText.toLowerCase();
  return (
    item.name?.toLowerCase().includes(searchLower) ||
    item.email?.toLowerCase().includes(searchLower) ||
    item.code?.toLowerCase().includes(searchLower)
  );
  });
  const renderItem = ({ item }: { item: Recipient }) => {
  const displayName = item.name || item.code || 'Unknown';
  const displayEmail = item.email || (item.name ? item.code : '') || '';
  const displayImage = item.logo || (!item.name && !item.email ? Images.sent : null);
  return (
     <TouchableOpacity
      onPress={() => handlePress(item)}
      style={styles.itemContainer}
    >
    <View style={styles.itemContainer}>
  
      <View style={styles.imageBox}>
      {displayImage && (
      <Image source={displayImage} style={styles.sentImage} />
        )}
      </View>


      <View style={styles.textContent}>
        <Text style={styles.name}>{displayName}</Text>
        {displayEmail ? (
          <Text style={styles.email}>{displayEmail}</Text>
        ) : null}
      </View>
    </View>
    </TouchableOpacity>
  );
};


const handlePress = (item: Recipient) => {
  const rname = item.name || '';
  const subtext = item.email || item.code || '';
  const logo = item.logo || null;
  dispatch(setRecipient({ rname, subtext, logo }));
  navigation.navigate('SendDetails');
};
  return (
    <View style={styles.container}>
      <AssetsHeader title="Select Recipient" />
      <View style={{marginHorizontal: 10}}>
      <SearchBox
        placeholder="Enter Name or Wallet Address"
        value={searchText}
        onChangeText={setSearchText}
        onQrPress={handleQrPress}
        onClear={handleClear}
      />
      </View>
      <ScrollView>
      <View style={styles.suggestedRow}>
        <Text style={styles.suggestedText}>Suggested</Text>
        {!loading && (
          <TouchableOpacity style={styles.syncButton}>
            <Image source={Images.sync} style={styles.syncIcon} />
            <Text style={styles.syncText}>Sync Contacts</Text>
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.divider} />
      <View style={{paddingHorizontal: 15}}>
     {loading ? (
    <FlatList
    data={Array.from({ length: 5 })}
    keyExtractor={(_, index) => index.toString()}
    renderItem={() => <RecipientSkeleton />}
  />
  ) : (
   <FlatList
    data={filteredData}
    scrollEnabled={false}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
   ListEmptyComponent={
    !loading ? (
      <Text style={styles.noUserText}>No user name found</Text>
    ) : null
  }
  />
)}
</View>
</ScrollView>
    </View>
  );
};
export default SelectRecipient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: 10,
  },
  suggestedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 15,
    marginTop: 25,
  },
  suggestedText: {
    color: Colors.white,
    fontSize: 15,
  },
  syncButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  syncIcon: {
    width: 12,
    height: 12,
    marginRight: 5,
    resizeMode:'contain'
  },
  syncText: {
    color: Colors.downArrow,
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background1,
    marginBottom: 10,
    marginTop: 8,
    marginHorizontal: 15
  },
  itemContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    marginBottom: 10,
  },
  imageBox: {
    width: 50,
    height: 50,
    backgroundColor: Colors.deepNavy,
    borderRadius: 25,
    marginRight: 12,
    resizeMode:'contain'
  },
  textContent: {
    justifyContent: 'space-between',
  },
  name: {
    color: Colors.white,
    fontSize: 15,
    fontWeight: 'bold',
  },
  email: {
    color: Colors.lightblue,
    fontSize: 13,
  },
  sentImage: {
    width: '100%',
    height: '100%',
  },
  noUserText: {
    color: Colors.downArrow,
    fontSize: 15,
    textAlign: 'center',
    marginTop: 20,
  },
});