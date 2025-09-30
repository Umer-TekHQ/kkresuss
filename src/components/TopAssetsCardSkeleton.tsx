import React from 'react';
import { View, StyleSheet } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Colors } from '../theme/colors';
const TopAssetsCardSkeleton = () => {
  return (
    <View style={styles.card}>
      <SkeletonPlaceholder
        backgroundColor="#030A74"
        highlightColor="#1E2D56"
        speed={1200}
      >
        {[...Array(7)].map((_, index) => (
          <View key={index} style={styles.row}>
            <View style={styles.logo} />
            <View style={styles.assetInfo}>
              <View style={styles.assetName} />
              <View style={styles.assetSymbol} />
            </View>
            <View style={styles.priceBlock}>
              <View style={styles.price} />
              <View style={styles.amount} />
            </View>
          </View>
        ))}
      </SkeletonPlaceholder>
    </View>
  );
};

export default TopAssetsCardSkeleton;

const styles = StyleSheet.create({
  card: {
    width: 345,
    backgroundColor: Colors.background,
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: Colors.fieldBackground1,
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
    marginRight: 12,
  },
  assetInfo: {
    width: 100,
    justifyContent: 'center',
  },
  assetName: {
    width: 140,
    height: 16,
    borderRadius: 4,
    marginBottom: 4,
  },
  assetSymbol: {
    width: 140,
    height: 14,
    borderRadius: 4,
  },
  priceBlock: {
    flex: 1,
    alignItems: 'flex-end',
  },
  price: {
    width: 90,
    height: 16,
    borderRadius: 4,
    marginBottom: 6,
  },
  amount: {
    width: 90,
    height: 14,
    borderRadius: 4,
    marginBottom: 2,
  },
});
