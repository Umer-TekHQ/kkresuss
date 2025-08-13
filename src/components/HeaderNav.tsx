import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Images } from '../assets';
import styles from '../styles/homestyles';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../navigators/routeNames'
import { useAppSelector } from '../store/hooks';

type NavigationProp = NativeStackNavigationProp<AppNavigatorParamList>;

export const HeaderNav: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  
  const { username, profilePicture } = useAppSelector(state => state.user);
  
  const displayName = username || 'Nate Diggity';
  
  return (
    <View style={styles.header}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} >
          <Image source={profilePicture || Images.profileicon} style={styles.profileIcon} />
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
          <Image source={Images.secure} style={[styles.secureIcon, { marginLeft: 20 }]} />
        </TouchableOpacity>
      </View>
    </View>
  );
};
