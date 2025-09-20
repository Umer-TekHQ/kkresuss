import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Token } from '../screens/Trade/types';
import { Colors } from '../theme/colors';

const ReceivedBox = ({ token, amount }: { token: Token; amount: string }) => (
  <View style={styles.box}>
    <View style={styles.right}>
      <Text style={styles.title}>Received</Text>
      <View style={styles.tokenRow}>
        <Text style={styles.token}>{token.abbreviation}</Text>
        <Text style={styles.amount}>{amount} {token.abbreviation}</Text>
      </View>
    </View>
    <View style={styles.block}>
      <Text style={styles.date}>Thu, Apr 11, 2024</Text>
      <Text style={styles.usd}>$396.14</Text>
    </View>
  </View>
);

export default ReceivedBox;

const styles = StyleSheet.create({
  box: {
    backgroundColor: Colors.background4,
    padding: 16,
    width: wp('95%'),
    justifyContent: 'space-between',
    marginHorizontal: 7,

  },
  right: {},
  title: {
    color: Colors.gold,
    fontSize: 15,
    lineHeight: 19,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  token: {
    color: Colors.white,
    fontSize: 19,
  },
  amount: {
    color: Colors.white,
    fontSize: 19,
  },
  block: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  date: {
    color: Colors.lightblue,
    fontSize: 15,
  },
  usd: {
    color: Colors.lightblue,
    fontSize: 15,
  },
});
