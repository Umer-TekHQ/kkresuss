import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import { tokens } from './tokens';
import { Token } from './types';
import PopularTokenChips from '../../components/popularTokenChips';
import ReceiveEmptyState from '../../components/receiveEmptyState';
import ReceiveSearchHeader from '../../components/receiveSearchHeader';
import ReceiveTokenList from '../../components/receiveTokenList';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';
import { Colors } from '../../theme/colors';

type ReceiveTokenScreenRouteProp = RouteProp<AppNavigatorParamList, 'SearchScreen'>;

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
      <ReceiveSearchHeader
        value={searchText}
        onChangeText={setSearchText}
        onClear={handleClear}
      />

      {searchText.length > 0 && filteredTokens.length === 0 ? (
        <ReceiveEmptyState />
      ) : (
        <ScrollView>
          <Text style={styles.sectionTitle}>What the Pros are Buying</Text>
          <PopularTokenChips onSelect={handleSelect} />

          <Text style={styles.sectionTitle}>Supported Tokens</Text>
          <ReceiveTokenList tokens={filteredTokens} onSelect={handleSelect} />
        </ScrollView>
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
});
