import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Clipboard from '@react-native-clipboard/clipboard';
import Toast from 'react-native-toast-message';
import { Images } from '../assets/index';

interface Props {
  icon: any;
  title: string;
  address: string;
  background: any;
}

const ProfileCard: React.FC<Props> = ({ icon, title, address, background }) => {
  const handleCopy = () => {
    Clipboard.setString(address);

    Toast.show({
      type: 'success',
      text1: 'Copied',
      text2: 'Address copied to clipboard!',
      position: 'bottom',
      visibilityTime: 1500,
      autoHide: true,
    });
  };

  return (
    <View style={styles.card}>
      <Image source={background} style={styles.bgImage} />
      <View style={styles.overlay}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.info}>
          <Text style={styles.title}>{title}</Text>

          <TouchableOpacity
            style={styles.addressContainer}
            activeOpacity={0.7}
            onPress={handleCopy}
          >
            <Image source={Images.copy} style={styles.copyimg} />
            <Text style={styles.address}>{address}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 230,
    width: 355,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'black',
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  overlay: {
    flex: 1,
    padding: 20,
  },
  icon: {
    width: 34,
    height: 34,
    marginBottom: 10,
  },
  info: {
    flex: 1,
    marginTop: 80,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    fontSize: 16,
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#724CC4',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  copyimg: {
    marginRight: 10,
    width: 15,
    height: 15,
    resizeMode: 'cover',
  },
  address: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ProfileCard;
