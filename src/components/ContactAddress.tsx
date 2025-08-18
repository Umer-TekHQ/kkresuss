import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Images } from '../assets';

export const ContactAddress = () => {
  return (
    <View style={styles.contactRow}>
      <Text style={styles.contactLabel}>Contract Address</Text>
      <View style={styles.contactRight}>
        <Text style={styles.contactValue}>0x71C7…976F</Text>
        <Image source={Images.copy} style={styles.copyIcon} resizeMode="contain" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 6,
    marginBottom:15,
  },
  contactLabel: {
    fontSize: 13,
    color: '#ADD2FD',
  },
  contactRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactValue: {
    color: '#FFFFFF',
    fontSize: 15,
    marginRight: 6,
  },
  copyIcon: {
    width: 16,
    height: 16,
    tintColor: '#FFFFFF',
  },
});
