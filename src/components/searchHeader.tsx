import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBox from '../components/SearchBox';

const SearchHeader = ({
  value,
  onChangeText,
  onClear,
}: {
  value: string;
  onChangeText: (text: string) => void;
  onClear: () => void;
}) => (
  <View style={styles.searchBox}>
    <SearchBox
      placeholder="Search Name or Address"
      value={value}
      onChangeText={onChangeText}
      onClear={onClear}
    />
  </View>
);

export default SearchHeader;

const styles = StyleSheet.create({
  searchBox: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
});
