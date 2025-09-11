import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

import { Colors } from '../theme/colors';

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2;

const ExploreSkeletonLoader = () => {
  return (
    <View style={styles.container}>
    <SkeletonPlaceholder
      backgroundColor="#0D0D33"
      highlightColor="#1A1A66"
    >
        <View style={styles.fullHeight}>
        <View style={styles.cardGrid}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.cardContainer}>
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    justifyContent: 'space-between',
  },
 fullHeight: {
    minHeight: Dimensions.get('window').height,
    padding: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  headerTextBlock: {
    width: 180,
    height: 20,
    borderRadius: 4,
  },
  icon: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  titleBar: {
    width: 160,
    height: 36,
    borderRadius: 8,
    marginBottom: 24,
  },
  tabRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  tabButton: {
    width: 70,
    height: 30,
    borderRadius: 6,
  },
  cardGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardContainer: {
    width: cardWidth,
    marginBottom: 34,
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
