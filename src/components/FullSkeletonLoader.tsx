import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const FullSkeletonLoader = () => {
  return (
    <View style={styles.container}>
    <SkeletonPlaceholder backgroundColor="#0D0D33" highlightColor="#1A1A66">
    <View style={styles.fullHeight}>


        {/* Horizontal Card Skeleton */}
        <View style={styles.summarycard}>
        <View style={styles.cardContainer}>
          <View style={styles.cardLineShort} />
          <View style={styles.cardLineMedium} />
          <View style={styles.cardLineShort} />
          <View style={styles.cardLineSmall} />
        </View>

        {/* Small Square Buttons */}
        <View style={styles.squareRow}>
          {[...Array(5)].map((_, index) => (
            <View key={index} style={styles.square} />
          ))}
        </View>
        </View>

        {/* Circular Icons */}
        <View style={styles.circleRow}>
          {[...Array(4)].map((_, index) => (
            <View key={index} style={styles.circleWrapper}>
              <View style={styles.circle} />
              <View style={styles.circleBar} />
            </View>
          ))}
        </View>

        {/* Long Bar */}
        <View style={styles.longBarRow}>
          <View style={styles.longBar} />
          <View style={styles.dot} />
        </View>

        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar} />
          <View>
            <View style={styles.profileLineShort} />
            <View style={styles.profileLineMedium} />
            <View style={styles.profileLineMedium} />

          </View>
          <View style={styles.profileButton} />
        </View>

        {/* Footer/Projects Row */}
        <View style={styles.footerRow}>
          <View style={styles.footerCircle} />
          <View style={styles.footerButton} />
          <View style={styles.footerButtonSmall} />
        </View>

        {/* Bottom Cards */}
        <View style={styles.bottomCard}>
          <View style={styles.bottomLine} />
          <View style={styles.bottomLine} />
          <View style={styles.bottomLine} />
        </View>

      </View>
    </SkeletonPlaceholder>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#0D0D33',
  },
  fullHeight: {
  minHeight: Dimensions.get('window').height,
  padding: 8,
  },
  cardContainer: {
    marginBottom: 20,
  },
  summarycard:{
    borderWidth: 1.5,
    borderColor: '#1A1A66',
    borderRadius: 18,
    padding: 16,
    marginBottom: 24,
  },
  cardLineShort: {
    width: SCREEN_WIDTH * 0.4,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  cardLineMedium: {
    width: SCREEN_WIDTH * 0.6,
    height: 20,
    borderRadius: 4,
    marginBottom: 8,
  },
  cardLineSmall: {
    width: SCREEN_WIDTH * 0.3,
    height: 20,
    borderRadius: 4,
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  square: {
    width: 50,
    height: 50,
    borderRadius: 8,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  circleWrapper: {
    alignItems: 'center',
  },
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  circleBar: {
    width: 30,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
  },
  longBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  longBar: {
    flex: 1,
    height: 14,
    borderRadius: 7,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    marginLeft: 10,
  },
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    // borderRadius: 12,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: '#1A1A66',
    borderRadius: 18,
    // padding: 16,
    // marginBottom: 24,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileLineShort: {
    width: 80,
    height: 10,
    borderRadius: 4,
    marginBottom: 6,
  },
  profileLineMedium: {
    width: 120,
    height: 10,
    borderRadius: 4,
  },
  profileButton: {
    width: 60,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#1A1A66',
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
    alignItems: 'center',
  },
  footerCircle: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  footerButton: {
    width: 70,
    height: 20,
    borderRadius: 10,
  },
  footerButtonSmall: {
    width: 40,
    height: 20,
    borderRadius: 10,
  },
  bottomCard: {
    padding: 16,
    borderRadius: 12,
  },
  bottomLine: {
    width: '100%',
    height: 12,
    borderRadius: 6,
    marginBottom: 10,
  },
});

export default FullSkeletonLoader;
