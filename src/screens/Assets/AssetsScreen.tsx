import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList, TouchableOpacity,ScrollView,Image, Animated,  } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import CryptoChart from '../../components/CryptoChart';
import { ActionButtons } from '../../components/ActionButtons';
import { Images } from '../../assets';
import { HeaderNav } from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import TopAssetsCard from '../../components/TopAssetsCard';
import AllAssetsList from '../../components/AllAssetsList';
import CoinbaseCard from '../../components/CoinbaseCard';
import SecondaryButton from '../../components/SecondaryButton';
import BottomSheetBase from '../../components/BottomSheetBase';
import NFTCard from '../../components/NFTCard';
import TransactionCard from '../../components/TransactionCard';
import nftImages from '../../mock/NftImages';
import {transactionData} from '../../mock/nftRecentData'
import TransactionButton from '../../components/TransactionButton';
import { TokenActionButtons } from '../../components/TokenActionButtons';
import BottomSheetNetwork from '../../components/BottomSheetNetwork';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';

const initialLayout = { width: Dimensions.get('window').width };


const CryptoTab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
const [showSheet, setShowSheet] = useState(false);

  return (
    <View style={{ flex: 1 ,}}>
    
      <ScrollView
        contentContainerStyle={{
          paddingHorizontal: 12,
          paddingTop: 20,
          paddingBottom: 40, 
        }}
        showsVerticalScrollIndicator={false}
      >
        <CryptoChart />
        <View style={styles.divider} />
        <TokenActionButtons />

        <View style={{ marginTop: 20, alignItems: 'center' }}>
          <TopAssetsCard />
        </View>

        <View style={styles.popularHeader}>
          <Text style={styles.sectionTitle}>Popular</Text>
            <TouchableOpacity onPress={() => setShowSheet(true)}>
            <View style={styles.popularIcons}>
            <Image source={Images.base} style={styles.popularIcon} />
            <Image source={Images.down} style={[styles.popularIcon, { marginLeft: 4 }]} />
            </View>
            </TouchableOpacity>
        </View>

        <View style={styles.popularDivider} />
        <AllAssetsList />
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('Supported')}
        >
          <Text style={styles.viewAllText}>View All</Text>
        </TouchableOpacity>
        <View style={{marginTop:45,}}>
        <CoinbaseCard />
        </View>
        <View style={{ marginTop: 10, marginBottom: 40 }}>
          <SecondaryButton label="View Spam" onPress={() => navigation.navigate('Spam', { defaultTab: 'Crypto' })} />
        </View>
      </ScrollView>

     
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        {/* <BottomSheetBase /> */}
        <BottomSheetNetwork visible={showSheet} onClose={() => setShowSheet(false)} />
      </View>
    </View>
  );
};

const NFTsTab = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

const screenWidth = Dimensions.get("window").width;
const ITEM_MARGIN = 4;
const NUM_COLUMNS = 2;
const ITEM_WIDTH = (screenWidth - ITEM_MARGIN * (NUM_COLUMNS + 1)) / NUM_COLUMNS;


  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#01032C' }} contentContainerStyle={{ padding: 16 }}>
      <Text style={styles.myNFTsText}>My NFTs</Text>

      <View style={styles.nftGrid}>
       <FlatList
        data={nftImages}
        renderItem={({ item }) =>(
          <View  style={{ margin: ITEM_MARGIN }}>
           <NFTCard image={item.image} style={{ width: ITEM_WIDTH }}
           />
           </View>
  )}
        keyExtractor={(item) => item.id}
        numColumns={2}
        scrollEnabled={false}
          />

      </View>

      <View style={{ marginTop: 20,  }}>
        <SecondaryButton label="View Spam" onPress={() => navigation.navigate('Spam', { defaultTab: 'NFTs' })} />
      </View>

      <View style={{ height: 28, marginTop:20 }}>
        <Text style={styles.recentTransactions}>Recent Transactions</Text>
      </View>
    <View style={styles.popularDivider} />
    <View style={{ borderRadius: 12 }}>
      <FlatList
       data={transactionData}
       renderItem={({ item }) => <TransactionCard item={item} />}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        />
    </View>
    <View style={styles.bottomSpace} >
  <TransactionButton  />
    </View>
  
  </ScrollView>
  );
};



const EarnTab = () => (
  <View style={styles.placeholderContainer}>
    <Text style={styles.placeholder}>Earn data here</Text>
  </View>
);

const AssetsScreen = () => {

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'crypto', title: 'Crypto' },
    { key: 'nfts', title: 'NFTs' },
    { key: 'earn', title: 'Earn' },
  ]);

  const renderScene = SceneMap({
    crypto: CryptoTab,
    nfts: NFTsTab,
    earn: EarnTab,
  });

  return (
    <View style={{ flex: 1, backgroundColor: index === 1 ? '#01032C' : '#01021D' }}>
      <HeaderNav />
      {/* <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
        renderTabBar={props => (
          <TabBar
            {...props}
            indicatorStyle={{ backgroundColor: '#7AB7FD',height:2 }}
            // style={{ backgroundColor: '#000' }}
           style={{ backgroundColor: index === 1 ? '#01032C' : '#01021D' }}
            activeColor="white"
            inactiveColor="#7AB7FD"
          />
        )}
      /> */}
      

<TabView
  navigationState={{ index, routes }}
  renderScene={renderScene}
  onIndexChange={setIndex}
  initialLayout={initialLayout}
  renderTabBar={(props) => (
    <TabBar
      {...props}
      renderIndicator={(indicatorProps) => {
        const { position, navigationState, getTabWidth } = indicatorProps;
        const inputRange = navigationState.routes.map((_, i) => i);

        const translateX = position.interpolate({
          inputRange,
          outputRange: inputRange.map((i) => {
            let tabWidth = getTabWidth ? getTabWidth(i) : initialLayout.width / navigationState.routes.length;
            let textWidth = navigationState.routes[i].title.length * 8; // Approx width per char
            return (tabWidth - textWidth) / 2 + i * tabWidth ;
          }),
        });

        return (
          <Animated.View
            style={{
              position: 'absolute',
              height: 2,
              backgroundColor: '#7AB7FD',
              bottom: 0,
              width: navigationState.routes[index].title.length * 8 + 8, 
              transform: [{ translateX }],
            }}
          />
        );
      }}
      style={{
        backgroundColor: index === 1 ? '#01032C' : '#01021D',
      }}
      activeColor="white"
      inactiveColor="#7AB7FD"
    />
  )}
/>



    </View>
  );
};

export default AssetsScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 5,
   
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2D56',
  },
  tabButton: {
    alignItems: 'center',
    paddingBottom: 8,
  },
  tabText: {
    color: '#7AB7FD',
    fontSize: 14,
    fontWeight: '500',
  },
  activeTabText: {
    color: 'white',
  },
  underline: {
    width: 30,
    height: 2,
    backgroundColor: 'white',
    marginTop: 4,
    borderRadius: 1,
  },
  
  sectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
   // marginBottom: 10,
  },
 
  placeholder: {
    color: '#777',
    textAlign: 'center',
    marginTop: 100,
  },
  placeholderContainer: {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
},
popularDivider: {
  height: 1,
  backgroundColor: '#080C4C',
  marginVertical: 8,
},

viewAllButton: {
  marginTop: 30,
  alignSelf: 'center',
  width: '90%',
  paddingVertical: 12,
  borderRadius: 99,
  borderWidth: 1,
  borderColor: '#4898F3',
  backgroundColor: 'transparent',
},

viewAllText: {
  color: 'white',
  fontWeight: '600',
  textAlign: 'center',
  fontSize: 16,
},
popularHeader: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  marginTop: 20,
  marginBottom: 10,
  marginLeft:4,
},

popularIcons: {
  flexDirection: 'row',
  alignItems: 'center',
},

popularIcon: {
  width: 27,
  height: 27,
  resizeMode: 'contain',
},
  divider: {
    height: 1,
    backgroundColor: '#10178A',
    marginHorizontal:22,
  },
  myNFTsText: {
  color: '#fff',
  fontSize: 19,
  fontWeight: '600',
  marginTop: 20,
  marginBottom: 5,
},

nftGrid: {
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
},

recentTransactions: {
  color: 'white',
  fontSize: 15,
  fontWeight: 'bold',

},
bottomSpace:{
  marginBottom:60,
}

});


