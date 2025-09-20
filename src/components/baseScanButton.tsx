import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Colors } from '../theme/colors';

const BaseScanButton = () => (
  <View style={styles.container}>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.text}>View Details on BaseScan</Text>
    </TouchableOpacity>
  </View>
);

export default BaseScanButton;

const styles = StyleSheet.create({
  container: { alignItems: 'center' },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    width: wp('85%'),
    height: hp('7%'),
    marginTop: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.blue,
    borderRadius: 30,
  },
  text: { color: Colors.white, fontSize: 15 },
});
