import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Images } from '../../assets';
import { Card } from '../../components/CompletionCard'; 
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { tokens } from './tokens';
import { Token } from './types';

const TradeStatusScreen = ({navigation, route}: any) => {
  const tradeState = useAppSelector(state => state.trade);
  
  const [tradeData, setTradeData] = useState({
    token1: null as Token | null,
    token2: null as Token | null,
    amount1: '',
    amount2: ''
  });
  
  useEffect(() => {
    if (tradeState.token1 || tradeState.token2) {
      setTradeData({
        token1: tradeState.token1,
        token2: tradeState.token2,
        amount1: tradeState.amount1,
        amount2: tradeState.amount2
      });
    }
  }, []);

  const normieToken = tokens.find(t => t.abbreviation === 'NORMIE');
  const defaultToken1 = normieToken || tokens[5] || {
    id: '6',
    name: 'Normie',
    abbreviation: 'NORMIE',
    logo: Images.token6,
    amount: '6,806.5292',
    price: '$396.14',
  };
  
  const defaultToken2 = {
    id: '8',
    name: 'Snort',
    abbreviation: 'SNORT',
    logo: Images.token8 || require('../../assets/images/token8.png'),
    amount: '865.58817085',
    price: '$396.14',
  };

  const displayToken1 = tradeData.token1 || tradeState.token1 || defaultToken1;
  const displayToken2 = tradeData.token2 || tradeState.token2 || defaultToken2;
  const displayAmount1 = tradeData.amount1 || tradeState.amount1 || '6,806.529209';
  const displayAmount2 = tradeData.amount2 || tradeState.amount2 || '865.58817085';

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.headline}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                source={Images.cancel}
                style={{marginTop: 20}}
              />
              </TouchableOpacity>
      <Text style={styles.header}>Trade Status</Text>
      </View>

      <View style={styles.swapCard}>
        <View style={styles.assetContainer}>
          <Image 
            source={displayToken1.logo} 
            style={styles.tokenImage} 
          />
          <Text style={styles.assetLabel}>{displayToken1.abbreviation}</Text>
        </View>

        <Image
         source={Images.downarroww}
         style={styles.arrow}
        />

        <View style={styles.assetContainer}>
          <Image 
            source={displayToken2.logo} 
            style={styles.tokenImage} 
          />
          <Text style={styles.assetLabel}>{displayToken2.abbreviation}</Text>
        </View>

      <View style={styles.receivedBox}>
        <View style={styles.right}>
        <Text style={styles.receivedTitle}>Received</Text>
        <Text style={styles.receivedtoken}>{displayToken2.abbreviation}</Text>
         <Text style={styles.receivedDate}>Thu, Apr 11, 2024</Text>
         </View>
         <View>
        <Text style={styles.receivedAmount}>{displayAmount2} {displayToken2.abbreviation}</Text>
        <Text style={styles.receivedUSD}>$396.14</Text>
        </View>
      </View>

      <View style={styles.tradeCompleteBtn}>
        <Text style={styles.tradeCompleteText}> <Image source={Images.tradecompletion} style={styles.tick}/> Trade Complete</Text>
      </View>
    </View>

      <Card 
        label="Traded" 
        value={`${displayAmount1} ${displayToken1.abbreviation}`} 
        usd="$396.14 USD" 
      />
      <Card 
        label="Provider Fees" 
        value={`${displayAmount2} ${displayToken2.abbreviation}`}  
        usd="$0.01 USD" 
      />
      <Card label="Network Fees" value={`${displayAmount2} ${displayToken2.abbreviation}`}  usd="$0.01 USD" strike />
      <Card 
        label="Transaction ID" 
        value={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>a32c...6dg4</Text>
            <Image
              source={Images.copy}
              style={{ width: 18, height: 18, marginLeft: 8 }}
            />
          </View>
        }
      />
    <View style={{alignItems: 'center'}}>
      <TouchableOpacity style={styles.bottombutton}>
        <Text style={styles.bottombtn}>View Details on BaseScan</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
  );
};

export default TradeStatusScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#02042C',
  },
  headline:{
    flexDirection: 'row',
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingBottom: 40,
  },
  header: {
    fontSize: 20,
    color: 'white',
    marginTop: 20,
    marginBottom: 16,
    marginLeft: 85,
  },
  swapCard: {
    backgroundColor: '#080C4C',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#030A74',
    paddingTop: 20,
    alignItems: 'center',
  },
  assetContainer: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  tokenImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: '#030A74',
    marginBottom: 8,
    paddingVertical: 20,
    resizeMode: 'contain'
  },
  assetLabel: {
    fontSize: 16,
    color: 'white',
  },
  arrow: {
    tintColor: '#F2C94C',
    width: 20,
    height: 25,
    marginVertical: 25,
  },
  receivedBox: {
    backgroundColor: '#030A74',
    // borderRadius: 16,
    padding: 16,
    width: 372,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  right:{
      },
  receivedTitle: {
    color: '#CEB55A',
    fontSize: 16,
    marginBottom: 6,
  },
  receivedtoken:{
    color: '#fff',
    fontSize: 20,
  },
  receivedAmount: {
    color: '#fff',
    fontSize: 20,
    fontWeight: '600',
    marginTop: 25,
  },
  receivedDate: {
    color: 'lightblue',
    fontSize: 16,
    marginTop: 4,
  },
  receivedUSD: {
    color: 'lightblue',
    fontSize: 16,
    fontWeight: '600',
    marginTop: 4,
    alignSelf: 'flex-end'
  },
  tradeCompleteBtn: {
    backgroundColor: '#CEB55A',
    paddingVertical: 6,
    width: 372,
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
  },
  tradeCompleteText: {
    fontWeight: '800',
    fontSize:18,
    color: '#0A0F3B',
  },
  bottombutton:{
    alignContent: 'center',
    paddingVertical: 15,
    marginTop: 15,
    borderWidth: 1.5,
    borderColor: '#4898F3',
    paddingHorizontal: 70,
    borderRadius: 30,
  },
  bottombtn:{
    color: 'white',
    fontSize: 15,
  },
  tick: {
    width: 20,
    height: 15,
    marginRight: 8,
    tintColor: '#0A0F3B',
  },
});
