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
import { useAppSelector} from '../../store/hooks';
import { tokens } from './tokens';
import { Token } from './types';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
                style={{marginTop: 15}}
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
        <View>
          <View></View>
        <Image
         source={Images.downarroww}
         style={styles.arrow}
        />
        </View>
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
        <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
        <Text style={styles.receivedtoken}>{displayToken2.abbreviation}</Text>
        <Text style={styles.receivedAmount}>{displayAmount2} {displayToken2.abbreviation}</Text>
        </View>
         </View>
         <View style={{flexDirection: 'row', flex: 1, justifyContent: 'space-between'}}>
          <Text style={styles.receivedDate}>Thu, Apr 11, 2024</Text>
          <Text style={styles.receivedUSD}>$396.14</Text>
        </View>
      </View>

      <View style={styles.tradeCompleteBtn}>
        <Text style={styles.tradeCompleteText}>✓ Trade Complete</Text>
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
      <Card 
        label={
        <View>
          <Text style={{color: '#ADD2FD', fontSize: 15  }}>Network Fees</Text>
          <Text style={{color: '#ADD2FD', fontSize: 15}}> (Waived )</Text>
        </View>}
        value={`${displayAmount2} ${displayToken2.abbreviation}`}  
        usd="$0.01 USD" strike />
      <Card 
        label="Transaction ID" 
        value={
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ color: '#ADD2FD' }}>a32c...6dg4</Text>
            <Image
              source={Images.copy}
              style={{ width: 18, height: 18, marginLeft: 8, tintColor: '#ADD2FD' }}
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
    marginBottom: hp('1%')
  },
  contentContainer: {
  },
  header: {
    fontSize: 19,
    color: 'white',
    marginTop: 20,
    marginLeft: wp('30%')
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
    width: 100,
    height: 100,
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
    width: 15,
    height: 20,
    marginVertical: 15,
  },
  receivedBox: {
    backgroundColor: '#030A74',
    padding: 16,
    width: wp('100%'),
    marginTop: 20,
    justifyContent: 'space-between',
  },
  right:{
      },
  receivedTitle: {
    color: '#CEB55A',
    fontSize: 15,
    lineHeight: 19,
  },
  receivedtoken:{
    color: '#fff',
    fontSize: 19,
  },
  receivedAmount: {
    color: '#fff',
    fontSize: 19,

  },
  receivedDate: {
    color: '#ADD2FD',
    fontSize: 15,
  },
  receivedUSD: {
    color: '#ADD2FD',
    fontSize: 15,
    
  },
  tradeCompleteBtn: {
    backgroundColor: '#CEB55A',
    paddingVertical: 6,
    width: wp('100%'),
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
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('5%'),
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#4898F3',
    borderRadius: 30,
  },
  bottombtn:{
    color: 'white',
    fontSize: 15,
  }
});
