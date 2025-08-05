
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';


const NFTCard = ({ image }: { image: any }) => {
  return (
    <View style={styles.nftBox}>
      <Image source={image} style={styles.nftImage} />
    </View>
  );
};

export default NFTCard;

const styles = StyleSheet.create({
  nftBox: {
    width: 170,
    height: 170,
    marginBottom: 10,
    marginRight: 10,
    backgroundColor: '#111',
    borderRadius: 10,
    overflow: 'hidden',
  },
  nftImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
