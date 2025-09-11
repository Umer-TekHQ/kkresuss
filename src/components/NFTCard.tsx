import React from 'react';
import { View, Image, StyleSheet ,ViewStyle} from 'react-native';

interface NFTCardProps {
  image: any;
  style?: ViewStyle;
}
const NFTCard = ({ image }: NFTCardProps) => {
  return (
    <View style={styles.nftBox}>
      <Image source={image} style={styles.nftImage} />
    </View>
  );
}
export default NFTCard;

const styles = StyleSheet.create({
   nftBox: {
    flex: 1,         
    aspectRatio: 1,     
    margin: 4,            
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
