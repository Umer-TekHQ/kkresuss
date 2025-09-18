import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Token } from '../screens/Trade/types';
import { Colors } from '../theme/colors';

const TokenItem = ({ token, onSelect }: { token: Token; onSelect: (token: Token) => void }) => (
  <TouchableOpacity onPress={() => onSelect(token)} style={styles.tokenItem}>
    <Image source={token.logo} style={styles.logo} />
    <View style={styles.tokenContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.tokenName}>{token.name}</Text>
        <Text style={styles.tokenAbbr}>{token.abbreviation}</Text>
      </View>
      <View style={styles.amountContainer}>
        <Text style={styles.amount}>{token.amount}</Text>
        <Text style={styles.price}>{token.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default TokenItem;

const styles = StyleSheet.create({
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
  tokenContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
});
