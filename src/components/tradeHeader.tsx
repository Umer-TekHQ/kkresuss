import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Images } from '../assets';
import { Colors } from '../theme/colors';

const TradeHeader = ({ navigation }: { navigation: any }) => (
  <View style={styles.headline}>
    <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
      <Image source={Images.cancel} style={styles.cancel} />
    </TouchableOpacity>
    <View style={styles.titleWrapper}>
      <Text style={styles.header}>Trade Status</Text>
    </View>
  </View>
);

export default TradeHeader;

const styles = StyleSheet.create({
  headline: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    left: 10,
    top: 13,
    zIndex: 10,
  },
  cancel: {
    width: 35,
    height: 35,
  },
  titleWrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 19,
    color: Colors.white,
    marginTop: 15
  },
});
