import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../assets';

const WarningBox = () => {
  return (
    <View style={styles.fixedBottom}>
      <View style={styles.warningBox}>
        <Image source={Images.warning} style={styles.warningIcon} />
        <View style={styles.textContainer}>
          <Text style={styles.warningText}>Insufficient Balance</Text>
          <Text style={styles.warningSubText}>
            Your Rocket Pool ETH balance is not enough.
          </Text>
        </View>
      </View>
    </View>
  );
};

export default WarningBox;

const styles = StyleSheet.create({
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#01021D',
  },
  warningBox: {
    backgroundColor: '#080C4C',
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderRadius: 12,
    width: Dimensions.get('window').width,
  },
  warningIcon: {
    width: 20,
    height: 20,
    marginRight: 12,
    marginTop:2,
  },
  warningText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  warningSubText: {
    color: '#FFFFFF',
    fontSize: 14,
    marginTop: 4,
  },
  textContainer: {
  flexDirection: 'column', 
  flex: 1,                
},
});
