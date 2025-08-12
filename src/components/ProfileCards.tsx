import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import {Images} from '../assets/index'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

interface Props {
  icon: any;
  title: string;
  address: string;
  background: any;
}

const ProfileCard: React.FC<Props> = ({ icon, title, address, background }) => {
  return (
    <View style={styles.card}>
      <Image source={background} style={styles.bgImage} />
      <View style={styles.overlay}>
        <Image source={icon} style={styles.icon} />
        <View style={styles.info}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.addressContainer}>
          <TouchableOpacity>
          <Image
           source={Images.copy}
           style={styles.copyimg}
           />
           </TouchableOpacity>
          <Text style={styles.address}>{address}</Text>
        </View>
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
  info:{
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
    borderWidth: 1,
    borderColor: '#724CC4',
    width: 145,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  copyimg:{
    marginRight: 14,
    marginLeft: 10,
    width: 15,
    height: 15,
    resizeMode: 'cover'
  },
  address: {
    color: 'white',
    fontSize: 13,
    fontWeight: '700',
  },
});

export default ProfileCard;
