import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Images } from '../assets';
import { AppNavigatorParamList } from '../navigators/routeNames'
import { useAppSelector } from '../store/hooks';
import { Colors } from '../theme/colors';

type NavigationProp = NativeStackNavigationProp<AppNavigatorParamList>;
const { width: screenWidth, } = Dimensions.get('window');


export const HeaderNav: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const { username, profilePicture } = useAppSelector(state => state.user);
  
  const displayName = username || 'Nate Diggity';
  
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} >
          <Image source={profilePicture || Images.profileIcon} style={styles.profileIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')}>
        <Text style={styles.profileName}>{displayName}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.headerIcons}>
        <TouchableOpacity>
          <Image source={Images.scanner} style={styles.headerIcon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={()=>navigation.navigate('Settings')}>
          <Image source={Images.secure} style={styles.secureIcon} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
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