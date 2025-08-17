import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useRoute,RouteProp } from '@react-navigation/native'; // 👈 yeh import zaroori hai
import AssetsHeader from '../../components/AssetsHeader ';
import { Images } from '../../assets'; 
import SpamAssetItem from '../../components/SpamAssetItem';
import { cryptoData } from '../../mock/cryptoData';
import { AppNavigatorParamList } from '../../navigators/routeNames'

type SpamScreenRouteProp = RouteProp<AppNavigatorParamList, 'Spam'>;

const SpamScreen = () => {
  const route = useRoute<SpamScreenRouteProp>();
  const { defaultTab } = route.params || {};   
  const [tab, setTab] = useState<'Crypto' | 'NFTs'>(defaultTab || 'Crypto');

  return (
    <View style={styles.container}>
      <AssetsHeader title="Spam" showRightIcons={false} />

      <View style={styles.tabs}>
        <TouchableOpacity
          onPress={() => setTab('Crypto')}
          style={[
            styles.tabButton,
            styles.leftTab,
            tab === 'Crypto' && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'Crypto' && styles.activeTabText,
            ]}
          >
            Crypto
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => setTab('NFTs')}
          style={[
            styles.tabButton,
            styles.rightTab,
            tab === 'NFTs' && styles.activeTabButton,
          ]}
        >
          <Text
            style={[
              styles.tabText,
              tab === 'NFTs' && styles.activeTabText,
            ]}
          >
            NFTs
          </Text>
        </TouchableOpacity>
      </View>

      {tab === 'Crypto' ? (
        <FlatList
          data={cryptoData}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <SpamAssetItem item={item} />}
          contentContainerStyle={{ paddingBottom: 80 }}
        />
      ) : (
        <View style={styles.nftContainer}>
          <Text style={{ color: '#999', textAlign: 'center' }}>No NFTs found.</Text>
        </View>
      )}

      <View style={styles.notificationBox}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={Images.check}
            style={{ width: 20, height: 20, resizeMode: 'contain', marginRight: 8 ,top:8}}
          />
          <Text style={styles.notificationText}>
            <Text style={{ fontWeight: '600' }}>Rocket Pool ETH</Text> removed from spam
          </Text>
        </View>
      </View>
    </View>
  );
};

export default SpamScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 16,
    paddingTop: 6,
  },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#01021D',
    borderRadius: 99,
    marginTop: 12,
    marginBottom: 10,
      borderBottomWidth: 1,
     borderBottomColor: '#030A74',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  leftTab: {
  borderTopLeftRadius: 99,
  borderBottomLeftRadius: 99,

},

rightTab: {
  borderTopRightRadius: 99,
  borderBottomRightRadius: 99,
},
  activeTabButton: {
    backgroundColor: '#030A74',
    borderRadius: 99,
      marginBottom: 3,
  },
  tabText: {
    color: '#ADD2FD',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  nftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  notificationBox: {
    position: 'absolute',
    bottom: 20,
    left: 16,
    right: 16,
    backgroundColor: '#ADD2FD',
    borderRadius: 10,
    padding: 12,
    height:60
  },
  notificationText: {
    color: '#01032C',
    fontSize: 15,
    top:8,

  },
});
