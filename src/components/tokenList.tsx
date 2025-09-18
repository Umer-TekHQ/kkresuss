import React from 'react';
import {Text, StyleSheet } from 'react-native';
import { Token } from '../screens/Trade/types';
import TokenItem from '../components/tokenItems';
import { Colors } from '../theme/colors';

const TokenList = ({
  tokens,
  onSelect,
}: {
  tokens: Token[];
  onSelect: (token: Token) => void;
}) => (
  <>
    <Text style={styles.sectionTitle}>My Holdings</Text>
    {tokens.map((token) => (
      <TokenItem key={token.id} token={token} onSelect={onSelect} />
    ))}
    <Text style={styles.sectionTitle}>Supported Tokens</Text>
    {tokens.map((token) => (
      <TokenItem key={`supported-${token.id}`} token={token} onSelect={onSelect} />
    ))}
  </>
);

export default TokenList;

const styles = StyleSheet.create({
  sectionTitle: {
    marginTop: 20,
    marginBottom: 10,
    color: Colors.lightblue,
    fontSize: 15,
    fontWeight: '600',
    paddingHorizontal: 15,
  },
});
