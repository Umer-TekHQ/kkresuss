import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const TradeCompleteBanner = () => (
  <View style={styles.banner}>
    <Image source={Images.tradeTick} style={styles.tick}/>
    <Text style={styles.text}> Trade Complete</Text>
  </View>
);

export default TradeCompleteBanner;

const styles = StyleSheet.create({
  banner: {
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    width: wp('95%'),
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    alignItems: 'center',
    marginHorizontal: 7,
    flexDirection: 'row',
    justifyContent: 'center'
  },
  text: {
    fontWeight: '700',
    fontSize: 18,
    color: Colors.background,
    fontFamily: 'Nunito Sans',
  },
  tick:{
    width: 20,
     height: 20,
     marginRight: 5,
     tintColor: Colors.black,
  }
});
