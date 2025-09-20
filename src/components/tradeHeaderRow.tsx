import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import TradeSwitch from './TradeSwitch';
import { Colors } from '../theme/colors';

const TradeHeaderRow = ({ isUSD, amount1, onToggleUSD }: { isUSD: boolean; amount1: string; onToggleUSD: () => void }) => (
  <View style={styles.headerRow}>
    <Text style={styles.title}>Trade</Text>
    <View style={styles.toggleRow}>
      <Text style={styles.enterUsdText}>Enter USD</Text>
      <TradeSwitch onValueChange={onToggleUSD} value={!!amount1 && amount1 !== '0' && isUSD} />
    </View>
  </View>
);

export default TradeHeaderRow;

const styles = StyleSheet.create({
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 30,
    marginBottom: 8,
  },
  title: {
    color: Colors.white,
    fontSize: 19,
    marginLeft: 12,
  },
  toggleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 12,
  },
  enterUsdText: {
    color: Colors.lightblue,
    marginRight: 8,
    fontSize: 13,
  },
});
