import React from 'react';
import { View, Text, StyleSheet, Image, Dimensions } from 'react-native';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const { width, height } = Dimensions.get('window');

type Props = {
  otpStarted: boolean;
};

const LogoAndHeading = ({ otpStarted }: Props) => (
  <View>
    <Image source={Images.logo} style={styles.logo} resizeMode="contain" />
    <Text style={styles.heading}>Check Your Email</Text>
    {otpStarted && <Text style={styles.subHeading}>and spam too</Text>}
  </View>
);

const styles = StyleSheet.create({
  logo: {
    position: 'absolute',
    top: 45,
    alignSelf: 'center',
    width: width * 0.3,
    height: height * 0.12,
  },
  heading: {
    marginTop: height * 0.22,
    letterSpacing: 1,
    fontSize: 30,
    fontWeight: '600',
    color: Colors.white,
    textAlign: 'center',
    height: 38,
    fontFamily: 'PlayfairDisplay-Bold',
  },
  subHeading: {
    marginTop: height * 0.006,
    fontSize: 15,
    lineHeight: 19,
    color: Colors.white,
    textAlign: 'center',
  },
});

export default LogoAndHeading;
