import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../theme/colors';

const TradeFooter = ({ onContinue, isEnabled }: { onContinue: () => void; isEnabled: boolean }) => (
  <View style={styles.footer}>
    <Text style={styles.gasText}>30 gas-free transactions remaining</Text>
    <TouchableOpacity
      style={[styles.continueBtn, isEnabled && { backgroundColor: Colors.white }]}
      onPress={onContinue}
      disabled={!isEnabled}
    >
      <Text style={[styles.continueText, isEnabled && { color: Colors.backgroundAlt }]}>Continue</Text>
    </TouchableOpacity>
  </View>
);

export default TradeFooter;

const styles = StyleSheet.create({
  footer: {
    marginTop: hp('15%'),
  },
  gasText: {
    color: Colors.lightblue,
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 30,
  },
  continueBtn: {
    backgroundColor: Colors.fieldBorder,
    paddingVertical: 12,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  continueText: {
    fontSize: 22,
    fontWeight: '500',
  },
});
