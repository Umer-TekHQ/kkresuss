import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ProfileInfo = () => {
  return (
    <View style={styles.profileContainer}>
      <View style={styles.avatarCircle}>
        <Text style={styles.avatarText}>AM</Text>
      </View>
      <Text style={styles.name}>Alvin Monk</Text>
      <Text style={styles.code}>0xc5...C4b2</Text>
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
    width: 50,
    height: 50,
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
    color: '#7A7A7A',
    fontSize: 12,
  },
});
