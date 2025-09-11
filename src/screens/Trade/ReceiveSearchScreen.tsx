import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Colors } from '../../theme/colors';
import { ScrollView } from 'react-native-gesture-handler';

import { tokens } from './tokens';
import { Token } from './types';
import SearchBox from '../../components/SearchBox';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';


type ReceiveTokenScreenRouteProp = RouteProp<AppNavigatorParamList, 'SearchScreen'>;

import { Images } from '../../assets';
const popularTokens = [
  { symbol: 'BTRST', logo: Images.token1 },
  { symbol: 'BRETT', logo: Images.token3 },
  { symbol: 'cbETH', logo: Images.token2 },
  { symbol: 'TOSHI', logo: Images.token5 },
  { symbol: 'MOCHI', logo: Images.token6 },
  { symbol: 'BSHIB', logo: Images.token7 },
  { symbol: 'USDT', logo: Images.token4 },
  { symbol: 'XRP', logo: Images.token2 },
  { symbol: 'ADA', logo: Images.token3 },
  { symbol: 'NORMIE', logo: Images.token6 },
  { symbol: 'SNORT', logo: Images.token8 }
];

const ReceiveTokenScreen = () => {
  const route = useRoute<ReceiveTokenScreenRouteProp>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { field } = route.params;
  const [searchText, setSearchText] = useState('');

  const handleClear = () => setSearchText('');

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
      <SearchBox
        placeholder="Search Name or Address"
        value={searchText}
        onChangeText={setSearchText}
        onClear={handleClear}
      />

      {searchText.length > 0 && filteredTokens.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Supported Tokens Found</Text>
          <Text style={styles.emptySubtitle}>
            Please double-check your search and try again.
          </Text>
        </View>
      ) : (
        <>
        <ScrollView>
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
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                style={styles.tokenItem}
              >
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
          </ScrollView>
        </>
      )}
    </View>
  );
};

export default ReceiveTokenScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  sectionTitle: {
    marginTop: 20,
    color: Colors.lightblue,
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
    borderColor: Colors.lightblue,
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
    color: Colors.white,
    fontSize: 14,
  },
  list: {
    paddingVertical: 16,
  },
  tokenItem: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: Colors.background1,
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
    color: Colors.white,
    fontSize: 16,
  },
  tokenAbbr: {
    color: Colors.lightblue,
    fontSize: 12,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    color: Colors.white,
    fontSize: 16,
  },
  price: {
    color: Colors.lightblue,
    fontSize: 12,
  },
  emptyContainer: {
    marginTop: 30,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: '#8DABD5',
    fontSize: 15,
  },
});
