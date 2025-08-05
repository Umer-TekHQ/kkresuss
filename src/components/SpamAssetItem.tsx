import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

const SpamAssetItem = ({ item }: any) => {
  return (
    <View style={styles.container}>
      <Image source={item.icon} style={styles.icon} />
      <View style={styles.assetDetails}>
       
        <View style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
     <Text style={styles.name}>{item.name}</Text>
     <Text
    style={[
      styles.change,
      { color: item.isNegative ? '#FF4D4D' : '#00E38C' },
    ]}
     >
    {'   '}{item.change}
  </Text>
</View>

        <Text style={styles.subPrice}>{item.subPrice}</Text>
      </View>
      <View style={styles.right}>
        <Text style={styles.price}>{item.price}</Text>
        <Text
          style={[
            styles.changeValue,
            { color: item.isNegative ? '#FF4D4D' : '#00E38C' },
          ]}
        >
          {item.changeValue}
        </Text>
      </View>
    </View>
  );
};

export default SpamAssetItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#1E2D56',
    alignItems: 'center',
  },
  icon: {
    width: 36,
    height: 36,
    marginRight: 12,
    resizeMode: 'contain',
  },
  assetDetails: {
    flex: 1,
  },
  name: {
    color: 'white',
    fontWeight: '500',
    fontSize: 15,
  },
  subPrice: {
    color: '#ADD2FD',
    fontSize: 12,
    marginTop: 2,
  },
  right: {
    alignItems: 'flex-end',
  },
  price: {
    color: 'white',
    fontWeight: '500',
    fontSize: 14,
  },
  changeValue: {
    fontSize: 12,
    marginTop: 2,
  },
  change: {
  fontSize: 13,
  fontWeight: '500',
},

});
