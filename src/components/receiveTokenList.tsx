import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { Token } from '../screens/Trade/types';
import ReceiveTokenItem from './receiveTokenItem';

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
