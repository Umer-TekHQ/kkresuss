import Clipboard from '@react-native-clipboard/clipboard';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

function truncateAddress(address?: string) {
  if (!address || address.length < 10) return address || 'N/A';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

export const ContactAddress = ({ contractAddress }: { contractAddress?: string }) => {
  const handleCopy = () => {
    if (contractAddress) {
      Clipboard.setString(contractAddress);
      Toast.show({
        type: 'success',
        text1: 'Copied',
        text2: 'Address copied to clipboard!',
        position: 'bottom',
        visibilityTime: 1500,
        autoHide: true,
      });
    }
  };

  return (
    <View style={styles.contactRow}>
      <Text style={styles.contactLabel}>Contract Address</Text>
      <TouchableOpacity style={styles.contactRight} onPress={handleCopy} activeOpacity={0.7}>
        <Text style={styles.contactValue}>{truncateAddress(contractAddress)}</Text>
        <Image source={Images.copy} style={styles.copyIcon} resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 0,
    marginTop: 6,
    marginBottom: 15,
    paddingHorizontal: 15,
    paddingVertical: 0,
  },
  contactLabel: {
    fontSize: 16,
    color: Colors.lightblue,
  },
  contactRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactValue: {
    color: Colors.white,
    fontSize: 16,
    fontWeight: '400',
    marginRight: 6,
    letterSpacing: 0.5,
  },
  copyIcon: {
    width: 16,
    height: 16,
    tintColor: Colors.white,
  },
});
