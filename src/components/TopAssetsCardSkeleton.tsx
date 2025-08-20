import React from 'react';
import { View, StyleSheet } from 'react-native';

const TopAssetsCardSkeleton = () => {
  return (
    <View style={styles.card}>
      {[...Array(6)].map((_, index) => (
        <View key={index}>
          <View style={styles.row}>
            <View style={styles.logo} />
            <View style={styles.assetInfo}>
              <View style={styles.assetName} />
              <View style={styles.assetSymbol} />
            </View>
            {/* <View style={styles.change} /> */}
            <View style={styles.priceBlock}>
              <View style={styles.price} />
              <View style={styles.amount} />
            </View>
          </View>
         
        </View>
      ))}
    </View>
  );
};

export default TopAssetsCardSkeleton;

const skeletonColor = '#030A74';

const styles = StyleSheet.create({
  card: {
    width: 345,
    backgroundColor: '#01032C',
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: '#1E2D56',
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  logo: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: skeletonColor,
    marginRight: 12,
  },
  assetInfo: {
    width: 100,
    justifyContent: 'center',
  },
  assetName: {
    width: 140,
    height: 16,
  //  borderRadius: 4,
    backgroundColor: skeletonColor,
    marginBottom: 4,
  },
  assetSymbol: {
    width: 140,
    height: 14,
  //  borderRadius: 4,
    backgroundColor: skeletonColor,
  },
//   change: {
//     width: 60,
//     height: 12,
//     borderRadius: 4,
//     backgroundColor: skeletonColor,
//     marginRight: 10,
//     position: 'absolute',
//     right: 85,
//     top: 20,
//   },
  priceBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    width: 90,
    height: 16,
    //borderRadius: 4,
    backgroundColor: skeletonColor,
    marginBottom: 6,
  },
  amount: {
    width: 90,
    height: 14,
   // borderRadius: 4,
    backgroundColor: skeletonColor,
    marginBottom: 2,
  },
 
});
