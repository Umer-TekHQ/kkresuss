import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const CoinbaseCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.leftBox}>
        <Image source={Images.coinBase} style={styles.coinImage} />
      </View>
      <View style={styles.rightBox}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Connect Coinbase</Text>
          <Text style={styles.subtitle}>
            Fund and trade with your Coinbase Exchange account.
          </Text>
        </View>
        <Image source={Images.forward} style={styles.forwardIcon} />
      </View>
    </View>
  );
};

export default CoinbaseCard;

const styles = StyleSheet.create({
  container: {
    height: 94,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    backgroundColor: Colors.transparent,
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    alignSelf: 'center',
    marginTop: 20,
    overflow: 'hidden', 
  },
  leftBox: {
    width: 70,
    height: '100%',
    borderTopLeftRadius: 13,
    borderBottomLeftRadius: 13,
    backgroundColor: Colors.background,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rightBox: {
    flex: 1,
    height: '100%',
    backgroundColor: Colors.fieldBorder,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    borderTopRightRadius: 13,
    borderBottomRightRadius: 13,
  },
  textContainer: {
    flex: 1,
    marginLeft: 5,
    justifyContent: 'center',
  },
  title: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '600',
  },
  subtitle: {
    color: Colors.lightblue,
    fontSize: 13,
    marginTop: 2,
    flexWrap: 'wrap',
  },
  coinImage: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
  },
  forwardIcon: {
    width: 16,
    height: 16,
    resizeMode: 'contain',
    marginLeft: 10,
 
    zIndex:4,
     tintColor: Colors.back,
  },
});
