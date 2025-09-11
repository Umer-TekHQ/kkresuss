import React from 'react';
import { View, Image, Text, TouchableOpacity,StyleSheet, Dimensions} from 'react-native';

import { Images } from '../assets/index';

import { Colors } from '../theme/colors';

const { width: screenWidth, } = Dimensions.get('window');

export const CommonHeader: React.FC <{ title?: string }> = ({ title = 'Nate Diggity' }) => (
  <View style={styles.header}>
    <View style={styles.profileContainer} >
      <Image source={Images.profileIcon} style={styles.profileIcon} />
      <Text style={styles.profileName}>{title}</Text>
    </View>
    <View style={styles.headerIcons}>
      <TouchableOpacity >
        <Image source={Images.scanner} style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Images.secure} style={[styles.headerIcon, { marginLeft: 20 }]} />
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 15,
    paddingBottom: 10,
    position: 'relative'
  },
    profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileIcon: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.09,
    borderRadius: screenWidth * 0.045,
    borderWidth: 2,
    borderColor: Colors.gold,
  },
  profileName: {
    fontSize: 15,
    color: Colors.white,
    marginLeft: 10,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    resizeMode: 'contain',
    width: 38,
    height: 38,
    tintColor: Colors.white,
  },
  secureIcon:{
    width: 38,
    height: 38
  },

  })