
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { useAppSelector } from '../store/hooks';

const ProfileInfo = () => {
  const { rname, subtext, logo } = useAppSelector(state => state.recipient);

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    if (names.length === 1) return names[0][0].toUpperCase();
    return names[0][0].toUpperCase() + names[names.length - 1][0].toUpperCase();
  };

  const renderAvatar = () => {
    if (logo) {
      return <Image source={logo} style={styles.avatarCircle} />;
    } else {
      const initials = rname ? getInitials(rname) : 'U';
      return (
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
      );
    }
  };

  return (
    <View style={styles.profileContainer}>
      {renderAvatar()}
      <Text style={styles.name}>{rname || subtext || 'Unnamed'}</Text>
      {!!subtext && <Text style={styles.code}>{subtext}</Text>}
    </View>
  );
};

export default ProfileInfo;


const styles = StyleSheet.create({
  profileContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  avatarCircle: {
    width: 60,
    height: 60,
    borderRadius: 25,
    backgroundColor: '#10178A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
  name: {
    color: '#FFF',
    fontSize: 16,
    marginTop: 8,
  },
  code: {
    color: '#ADD2FD',
    fontSize: 13,
  },
});
