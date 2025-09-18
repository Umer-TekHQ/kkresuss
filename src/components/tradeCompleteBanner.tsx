import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../theme/colors';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const TradeCompleteBanner = () => (
  <View style={styles.banner}>
    <Text style={styles.text}>✓ Trade Complete</Text>
  </View>
);

export default TradeCompleteBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    width: wp('96%'),
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    marginHorizontal: 7,
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.background,
    fontFamily: 'Nunito Sans',
  },
});
