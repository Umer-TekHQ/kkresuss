import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const PrivacyTopSection = () => (
  <View style={styles.topSection}>
    <View style={styles.logoRow}>
      <Image source={Images.logo} style={styles.logo} />
      <Text style={styles.kresus}>Kresus</Text>
    </View>
    <Text style={styles.privacyTitle}>Privacy Policy</Text>
  </View>
);

export default PrivacyTopSection;

const styles = StyleSheet.create({
  topSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
    backgroundColor: Colors.privacy,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -10,
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 10,
  },
  kresus: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '700',
  },
  privacyTitle: {
    color: Colors.white,
    fontSize: 28,
    marginTop: 25,
    marginBottom: 6,
    fontFamily: 'PlayfairDisplay-Bold'
  },
});
