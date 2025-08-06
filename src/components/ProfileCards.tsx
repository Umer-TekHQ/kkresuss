import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import {Images} from '../assets/index'

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
    width: 370,
    borderRadius: 20,
    overflow: 'hidden',
    backgroundColor: 'black'
    // marginBottom: 20,
  },
  bgImage: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'contain',
  },
  overlay: {
    flex: 1,
    padding: 20,
    // justifyContent: 'space-between',
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
    // fontWeight: '600',
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
