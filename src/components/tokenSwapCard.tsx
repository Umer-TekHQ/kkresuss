import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Images } from '../assets';
import { Token } from '../screens/Trade/types';
import { Colors } from '../theme/colors';


const TokenSwapCard = ({ token1, token2 }: { token1: Token; token2: Token }) => (
  <View style={styles.card}>
    <View style={styles.asset}>
      <Image source={token1.logo} style={styles.image} />
      <Text style={styles.label}>{token1.abbreviation}</Text>
    </View>
    <View style={styles.arrowWrapper}>
      <View style={styles.divider} />
      <Image source={Images.backYellow} style={styles.arrow} />
      <View style={styles.divider} />
    </View>
    <View style={styles.asset}>
      <Image source={token2.logo} style={styles.image} />
      <Text style={styles.label}>{token2.abbreviation}</Text>
    </View>
  </View>
);

export default TokenSwapCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.kresusBlue,
    marginTop: 30,
    width: wp('95%'),
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    borderWidth: 1,
    borderColor: Colors.background4,
    paddingTop: 20,
    alignItems: 'center',
    marginHorizontal: 7,
  },
  asset: {
    alignItems: 'center',
    paddingVertical: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 55,
    borderWidth: 5,
    borderColor: Colors.background4,
    resizeMode: 'contain',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: Colors.white,
  },
  arrowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
    justifyContent: 'center',
    gap: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background1,
    flex: 1,
  },
  arrow: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.gold,
  },
});
