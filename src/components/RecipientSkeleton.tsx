import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const RecipientSkeleton = () => {
  return (
    <SkeletonPlaceholder
      backgroundColor="#062FA3"
      highlightColor="#1E2D56"
      speed={1200}
    >
      <View style={styles.itemContainer}>
        <View style={styles.imagePlaceholder} />
        <View style={styles.textContainer}>
          <View style={styles.namePlaceholder} />
          <View style={styles.emailPlaceholder} />
        </View>
      </View>
    </SkeletonPlaceholder>
  );
};

export default RecipientSkeleton;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  namePlaceholder: {
    height: 15,
    width: '60%',
    borderRadius: 4,
    marginBottom: 6,
  },
  emailPlaceholder: {
    height: 13,
    width: '40%',
    borderRadius: 4,
  },
});
