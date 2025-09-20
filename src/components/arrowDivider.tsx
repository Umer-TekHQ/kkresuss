import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const ArrowDivider = () => (
  <View style={styles.arrowContainer}>
    <Image source={Images.downArroww} style={styles.downArrow} />
  </View>
);

export default ArrowDivider;

const styles = StyleSheet.create({
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  downArrow: {
    width: wp('4%'),
    height: hp('2.7%'),
    marginLeft: 15,
    tintColor: Colors.back,
  },
});
