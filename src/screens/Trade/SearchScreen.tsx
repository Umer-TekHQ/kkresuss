import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { tokens } from '../Trade/tokens';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { Token } from '../Trade/types';
import { Images } from '../../assets';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';

const SearchScreen = () => {
  const route = useRoute<RouteProp<AppNavigatorParamList, 'SearchScreen'>>();
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const { field } = route.params;

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
    
    // If onSelectToken callback is provided, call it (for backward compatibility)
    if (route.params.onSelectToken) {
      route.params.onSelectToken(token);
    }
    
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchbarr}>
        <Image source={Images.searchicon} style={styles.icon}/>
      <TextInput
        placeholder="Search name or address"
        placeholderTextColor="#8DABD5"
        style={styles.input}
        value={searchText}
        onChangeText={setSearchText}
      />
    </View>
      <Text style={styles.sectionTitle}>My Holdings</Text>

      <FlatList
        data={filteredTokens}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
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
    </View>
  );
};

export default SearchScreen;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01032C',
    paddingHorizontal: 16,
    paddingTop: 20,
  },
    icon: {
    marginTop: 15,
    width: 18,
    height: 18,
    marginRight: 8,
    tintColor: '#2a55cdff',
  },
  input: {
    flex: 1,
    color: '#8DABD5',
    fontSize: 20,
  },
  searchbarr:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    borderRadius: 40,
    borderColor: '#041B6A',
    borderWidth: 1.5,
    paddingVertical: 12,
    // paddingHorizontal: 90,
    paddingLeft: 20,
    color: '#8DABD5',
    fontSize: 16,

  },
  // searchBar: {
  //   // backgroundColor: '#12193A',
  //   borderRadius: 40,
  //   borderColor: '#041B6A',
  //   borderWidth: 1.5,
  //   paddingVertical: 22,
  //   paddingHorizontal: 90,
  //   color: '#8DABD5',
  //   fontSize: 16,
  // },
  sectionTitle: {
    marginTop: 20,
    color: '#8DABD5',
    fontSize: 15,
    fontWeight: '600',
  },
  list: {
    paddingVertical: 16,
  },
  tokenItem: {
    paddingTop: 20,
    borderTopWidth:1,
    // marginTop: 10,
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
    // fontWeight: '600',
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
    // fontWeight: '600',
  },
  price: {
    color: '#8DABD5',
    fontSize: 13,
  },
});
