import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';

import { tokens } from "./tokens";
import { Token } from "./types";
import SearchBox from '../../components/SearchBox';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';

const SearchScreen = () => {
  const route = useRoute<RouteProp<AppNavigatorParamList, 'SearchScreen'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const { field } = route.params;
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

  const renderToken = (item: Token) => (
    <TouchableOpacity key={item.id} onPress={() => handleSelect(item)} style={styles.tokenItem}>
      <Image source={item.logo} style={styles.logo} />
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={styles.textContainer}>
        <Text style={styles.tokenName}>{item.name}</Text>
        <Text style={styles.tokenAbbr}>{item.abbreviation}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{item.amount}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: Colors.backgroundAlt }} contentContainerStyle={{ paddingBottom: 20, }}>
      <View style={{ marginTop: 20, paddingHorizontal: 16}}>
      <SearchBox
            placeholder="Search Name or Address"
            value={searchText}
            onChangeText={setSearchText}
            onClear={handleClear}
      />
      </View>

      {searchText.length > 0 && filteredTokens.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Supported Tokens Found</Text>
          <Text style={styles.emptySubtitle}>
            Please double-check your search and try again.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.sectionTitle}>My Holdings</Text>
          {filteredTokens.map(renderToken)}

          <Text style={styles.sectionTitle}>Supported Tokens</Text>
          {filteredTokens.map(renderToken)}
        </>
      )}
    </ScrollView>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  icon: {
    marginTop: 15,
    width: 18,
    height: 18,
    marginRight: 6,
    tintColor: Colors.back,
  },
  input: {
    flex: 1,
    color: Colors.lightblue,
    fontSize: 20,
    marginRight: 10,
  },
  searchBarr: {
    flexDirection: 'row',
    marginTop: 15,
    justifyContent: 'flex-start',
    borderRadius: 40,
    borderColor: Colors.fieldBorder,
    borderWidth: 1.5,
    paddingVertical: 15,
    marginHorizontal: 16,
    paddingLeft: 20,
    color: Colors.lightblue,
    backgroundColor: Colors.background,
    fontSize: 16,
  },
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: Colors.lightblue,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 15,
  },
  tokenItem: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderColor: Colors.background4,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    paddingHorizontal: 15,
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
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: '#ADD2FD',
    fontSize: 15,
  },
});
