import React, { useState } from 'react';
import { ScrollView, StyleSheet} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';

import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch } from '../../store/hooks';
import { setToken1, setToken2 } from '../../store/slices/tradeSlice';
import { tokens } from './tokens';
import { Token } from './types';
import { Colors } from '../../theme/colors';

import SearchHeader from '../../components/searchHeader';
import TokenList from '../../components/tokenList';
import EmptyState from '../../components/emptyState';

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

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <SearchHeader value={searchText} onChangeText={setSearchText} onClear={handleClear} />
      {searchText.length > 0 && filteredTokens.length === 0 ? (
        <EmptyState />
      ) : (
        <TokenList tokens={filteredTokens} onSelect={handleSelect} />
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
  contentContainer: {
    paddingBottom: 20,
  },
});
