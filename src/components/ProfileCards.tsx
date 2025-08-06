import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Images } from '../assets/index';
import Clipboard from '@react-native-clipboard/clipboard';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  icon: any;
  title: string;
  address: string;
  background: any;
}

const ProfileCard: React.FC<Props> = ({ icon, title, address, background }) => {
  const cardWidth = screenWidth * 0.90;
  const cardHeight = screenHeight * 0.26;

  return (
    <View style={[styles.card, { width: cardWidth, height: cardHeight }]}>
      <Image source={background} style={[styles.bgImage]} />
      <View style={styles.overlay}>
        <Image source={icon} style={[styles.icon, { width: cardWidth * 0.09, height: cardWidth * 0.09 }]} />
        <View style={[styles.info, { marginTop: cardHeight * 0.35 }]}>
          <Text style={[styles.title, { fontSize: cardWidth * 0.045 }]}>{title}</Text>
          <View style={[styles.addressContainer, { width: cardWidth * 0.39, paddingVertical: cardHeight * 0.045, borderRadius: cardWidth * 0.055 }]}>
            <TouchableOpacity>
              <Image
                source={Images.copy}
                style={[styles.copyimg, { width: cardWidth * 0.04, height: cardWidth * 0.04, marginRight: cardWidth * 0.035, marginLeft: cardWidth * 0.027 }]}
              />
            </TouchableOpacity>
            <Text style={[styles.address, { fontSize: cardWidth * 0.035 }]}>{address}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#000'
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
    marginBottom: 10,
  },
  info: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    color: 'white',
    marginBottom: 10,
  },
  addressContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#724CC4',
    alignSelf: 'flex-start',
    marginBottom: 20,
    alignItems: 'center',
  },
  copyimg: {
    resizeMode: 'cover',
  },
  address: {
    color: 'white',
    fontWeight: '700',
  },
});

export default ProfileCard;
