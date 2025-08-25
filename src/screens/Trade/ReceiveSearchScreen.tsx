import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { tokens } from './tokens';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { Token } from './types';
import { Images } from '../../assets';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';
import { symbol } from 'd3';

type ReceiveTokenScreenRouteProp = RouteProp<AppNavigatorParamList, 'SearchScreen'>;

const popularTokens = [
  { symbol: 'BTRST', logo: require('../../assets/images/token1.png') },
  { symbol: 'BRETT', logo: require('../../assets/images/token3.png') },
  { symbol: 'cbETH', logo: require('../../assets/images/token2.png') },
  { symbol: 'TOSHI', logo: require('../../assets/images/token5.png') },
  { symbol: 'MOCHI', logo: require('../../assets/images/token6.png') },
  { symbol: 'BSHIB', logo: require('../../assets/images/token7.png') },
  { symbol: 'USDT', logo: require('../../assets/images/token4.png') },
  { symbol: 'XRP', logo: require('../../assets/images/token2.png') },
  { symbol: 'ADA', logo: require('../../assets/images/token3.png') },
  { symbol: 'NORMIE', logo: require('../../assets/images/token6.png')},
  { symbol: 'SNORT', logo: require('../../assets/images/token8.png')}
];

const ReceiveTokenScreen = () => {
  const route = useRoute<ReceiveTokenScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { field } = route.params;
  const [searchText, setSearchText] = useState('');

  const filteredTokens = tokens.filter(
    (token) =>
      token.name.toLowerCase().includes(searchText.toLowerCase()) ||
      token.abbreviation.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (token: Token) => {
    if (field === 'token1') {
      dispatch(setToken1(token));
    } else {
      dispatch(setToken2(token));
    }
    
    if (route.params.onSelectToken) {
      route.params.onSelectToken(token);
    }
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Image source={Images.searchicon} style={styles.icon} />
        <TextInput
          placeholder="Search name or address"
          placeholderTextColor="#8DABD5"
          style={styles.input}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <Text style={styles.sectionTitle}>What the Pros are Buying</Text>
      <View style={styles.tokenChipsRow}>
        {popularTokens.map((token, index) => {
        const selectedToken: Token = {
        id: token.symbol,         
        name: token.symbol,        
        abbreviation: token.symbol,
        logo: token.logo,
        amount: '0',               
        price: '$0.00',            
      };

    return (
      <TouchableOpacity
        key={index}
        style={styles.tokenChip}
        onPress={() => handleSelect(selectedToken)}
      >
        <Image source={token.logo} style={styles.chipLogo} />
        <Text style={styles.chipText}>{token.symbol}</Text>
      </TouchableOpacity>
    );
  })}
</View>


      <Text style={styles.sectionTitle}>Supported Tokens</Text>

      <FlatList
        data={filteredTokens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleSelect(item)} style={styles.tokenItem}>
            <Image source={item.logo} style={styles.logo} />
            <View style={styles.textContainer}>
              <Text style={styles.tokenName}>{item.name}</Text>
              <Text style={styles.tokenAbbr}>{item.abbreviation}</Text>
            </View>
            <View style={styles.amountContainer}>
              <Text style={styles.amount}>{item.amount}</Text>
              <Text style={styles.price}>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ReceiveTokenScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01032C',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    borderRadius: 40,
    borderColor: '#041B6A',
    borderWidth: 1.5,
    paddingVertical: 12,
    paddingLeft: 20,
    alignItems: 'center',
    backgroundColor: '#101221'
  },
  icon: {
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: '#086DE1',
  },
  input: {
    flex: 1,
    color: '#8DABD5',
    fontSize: 20,
  },
  sectionTitle: {
    marginTop: 20,
    color: '#8DABD5',
    fontSize: 15,
    fontWeight: '600',
  },
  tokenChipsRow: {
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tokenChip: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: '#041B6A',
    borderColor: '#8DABD5',
    borderWidth: 1,
    borderRadius: 24,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginRight: 15,
    marginBottom: 10,
    
  },
  chipLogo: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 6,
  },
  chipText: {
    color: '#fff',
    fontSize: 14,
  },
  list: {
    paddingVertical: 16,
  },
  tokenItem: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: '#041B6A',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingRight: 10,
  },
  logo: {
    width: 42,
    height: 42,
    marginRight: 12,
    borderRadius: 21,
  },
  textContainer: {
    flex: 1,
  },
  tokenName: {
    color: '#fff',
    fontSize: 20,
  },
  tokenAbbr: {
    color: '#8DABD5',
    fontSize: 14,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    color: '#fff',
    fontSize: 20,
  },
  price: {
    color: '#8DABD5',
    fontSize: 13,
  },
});
