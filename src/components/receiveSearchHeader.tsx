import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBox from './SearchBox';

const ReceiveSearchHeader = ({
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

export default ReceiveSearchHeader;

const styles = StyleSheet.create({
  searchBox: {
    marginBottom: 10,
  },
});
