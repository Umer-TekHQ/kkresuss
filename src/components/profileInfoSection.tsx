import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';

import { Images } from '../assets';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setProfilePicture } from '../store/slices/userSlice';
import { Colors } from '../theme/colors';

const screenWidth = Dimensions.get('window').width;
const AVATAR_SIZE = screenWidth * 0.19;
const NAME_FONT = screenWidth * 0.048;
const USERNAME_FONT = screenWidth * 0.04;
const UPGRADE_FONT = screenWidth * 0.037;

const ProfileInfoSection = () => {
  const { username, profilePicture } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();

  const displayName = username || 'Nate Morey';
  const displayUsername = username ? `${username.toLowerCase()}.kresus` : 'natemorey802.kresus';

  const handleChangeProfilePicture = () => {
    const newPicture = profilePicture === Images.profileIcon ? Images.profileIcon : Images.profileIcon;
    dispatch(setProfilePicture(newPicture));
  };

  return (
    <View style={styles.profileSection}>
      <TouchableOpacity onPress={handleChangeProfilePicture}>
        <Image
          source={profilePicture || Images.profileIcon}
          style={styles.avatar}
        />
      </TouchableOpacity>
      <Text style={styles.name}>{displayName}</Text>
      <Text style={styles.username}>{displayUsername}</Text>
      <TouchableOpacity>
        <Text style={styles.upgrade}>Upgrade ID {'>'}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileInfoSection;

const styles = StyleSheet.create({
  profileSection: {
    alignItems: 'center',
  },
  avatar: {
    width: AVATAR_SIZE, 
    height: AVATAR_SIZE, 
    borderRadius: AVATAR_SIZE / 2
  },
  name: {
    color: Colors.white,
    marginTop: 12,
    fontSize: NAME_FONT
  },
  username: {
    color: Colors.lightblue,
    marginTop: 4,
    fontSize: USERNAME_FONT
  },
  upgrade: {
    color: Colors.gold,
    marginTop: 4,
    fontSize: UPGRADE_FONT
  },
});
