import React from 'react';
import { FlatList, StyleSheet } from 'react-native';

import ReceiveTokenItem from './receiveTokenItem';
import { Token } from '../screens/Trade/types';

const ReceiveTokenList = ({
  tokens,
  onSelect,
}: {
  tokens: Token[];
  onSelect: (token: Token) => void;
}) => (
  <FlatList
    data={tokens}
    keyExtractor={(item) => item.id}
    contentContainerStyle={styles.list}
    scrollEnabled={false}
    renderItem={({ item }) => (
      <ReceiveTokenItem token={item} onSelect={onSelect} />
    )}
  />
);

export default ReceiveTokenList;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
  },
});
