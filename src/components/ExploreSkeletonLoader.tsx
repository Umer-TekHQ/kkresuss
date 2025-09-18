import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 38) / 2; 

const ExploreSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor="#0D0D33"
        highlightColor="#1A1A66"
        speed={2500}
      >
        <View style={styles.fullHeight}>
          <View style={styles.titleBar} />
          <View style={styles.cardGrid}>
            {[...Array(2)].map((_, index) => (
              <View key={`row1-${index}`} style={styles.cardContainer}>
                <View style={styles.cardImage} />
                <View style={styles.cardTextLine} />
                <View style={styles.cardTextLineShort} />
                <View style={styles.cardTextLineSmaller} />
              </View>
            ))}
          </View>

          <View style={styles.titleBar} />
          <View style={styles.cardGrid}>
            {[...Array(2)].map((_, index) => (
              <View key={`row2-${index}`} style={styles.cardContainer}>
                <View style={styles.cardImage} />
                <View style={styles.cardTextLine} />
                <View style={styles.cardTextLineShort} />
                <View style={styles.cardTextLineSmaller} />
              </View>
            ))}
          </View>
        </View>
      </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    paddingBottom: 60,
  },
  fullHeight: {
    minHeight: Dimensions.get('window').height,
    padding: 8,
  },
  titleBar: {
    width: 90,
    height: 18,
    borderRadius: 2,
    marginBottom: 16,
    marginTop: 8,
  },
  cardGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  cardContainer: {
    width: cardWidth,
    borderWidth: 1.5,
    borderColor: Colors.fieldBackground,
    borderRadius: 18,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 12,
    marginBottom: 10,
  },
  cardTextLine: {
    width: '90%',
    height: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  cardTextLineShort: {
    width: '70%',
    height: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  cardTextLineSmaller: {
    width: '50%',
    height: 10,
    borderRadius: 4,
  },
});

export default ExploreSkeletonLoader;
