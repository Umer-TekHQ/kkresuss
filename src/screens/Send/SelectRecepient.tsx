import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image,   } from 'react-native';
import React, { useState, useEffect } from 'react';
import AssetsHeader from '../../components/AssetsHeader ';
import SearchBox from '../../components/SearchBox';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import RecepientSkeleton from '../../components/RecepientSkeleton';
import { Images } from '../../assets'; 
import { recipients } from '../../mock/recipients'; 
import { ImageSourcePropType } from 'react-native';
import { useDispatch } from 'react-redux';
import { setRecipient } from '../../store/slices/recipientSlice';



const SelectRecepient = () => {
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
      <Image source={displayImage} style={styles.semtImage} />
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
      <AssetsHeader title="Select Recepient" showRightIcons={true} />

      <SearchBox
        placeholder="Enter Name or Wallet Address"
        value={searchText}
        onChangeText={setSearchText}
        onQrPress={handleQrPress}
        onClear={handleClear}
      />

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

     {loading ? (
    <FlatList
    data={Array.from({ length: 5 })}
    keyExtractor={(_, index) => index.toString()}
    renderItem={() => <RecepientSkeleton />}
  />
  ) : (
   <FlatList
    data={filteredData}
    renderItem={renderItem}
    keyExtractor={(item) => item.id}
  />
)}

    </View>
  );
};

export default SelectRecepient;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01021D',
    paddingHorizontal: 12,
  },
  suggestedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  suggestedText: {
    color: '#FFFFFF',
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
    color: '#fff',
    fontSize: 15,
  },
  divider: {
    height: 1,
    backgroundColor: '#10178A',
    marginBottom: 10,
    marginTop: 8,
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
    backgroundColor: '#2E2F40',
    borderRadius: 25,
    marginRight: 12,
  },
  textContent: {
    justifyContent: 'space-between',
  },
  name: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  email: {
    color: '#B0B0B0',
    fontSize: 12,
  },
  semtImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  resizeMode: 'cover',
},

});