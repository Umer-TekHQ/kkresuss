import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../theme/colors';

const FullSkeletonLoader = () => {
  return (
    <View style={styles.container}>
      <SkeletonPlaceholder
        backgroundColor="#01032C"
        highlightColor="#020B8E"
        speed={2000}
      >
        <View style={styles.fullHeight}>
          {/* Summary Card */}
          <View style={styles.summaryCard}>
            <View style={styles.cardContainer}>
              <View style={styles.cardLineShort} />
              <View style={styles.cardLineMedium} />
              <View style={styles.rowLine}>
                <View style={styles.cardLineSmall} />
                <View style={styles.cardLineXsmall} />
              </View>
            </View>

            <View style={styles.squareRow}>
              {[...Array(4)].map((_, index) => (
                <View key={index} style={styles.square} />
              ))}
              <View style={styles.rectangle} />
            </View>
          </View>

          {/* Circle Row */}
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
            <View style={styles.profileCardHeader}>
              <View style={styles.avatar} />
              <View style={styles.profileCardLines}>
                <View style={styles.profileLineShort} />
                <View style={styles.midLine}>
                  <View style={styles.profileLineXsmall} />
                  <View style={styles.profileLineXxsmall} />
                </View>
                <View style={styles.profileLineMedium} />
              </View>
              <View style={styles.buttonBackground}>
                <View style={styles.profileButton} />
              </View>
            </View>

            <View style={styles.percentLine}>
              <View style={styles.bar} />
              <View style={styles.bar} />
            </View>

            <View style={styles.profileBottom}>
              <View style={styles.dot1} />
              <View style={styles.bottomSmallLine} />
              <View style={styles.bottomXsmallLine} />
              <View style={styles.bottomX2smallLine} />
              <View style={styles.bottomSmallLine} />
              <View style={styles.dot1} />
            </View>
          </View>

          {/* Footer */}
          <View style={styles.footerRow}>
            <View style={styles.footerCircle} />
            <View style={styles.footerButton} />
            <View style={styles.footerButtonSmall} />
          </View>

          {/* Bottom Card */}
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
    padding: wp('4%'),
    backgroundColor: Colors.background,
  },
  fullHeight: {
    minHeight: Dimensions.get('window').height,
    padding: wp('2%'),
  },
  cardContainer: {
    marginBottom: hp('2.5%'),
  },
  summaryCard: {
    borderWidth: 1.5,
    borderColor: Colors.background1,
    borderRadius: wp('4%'),
    padding: wp('4%'),
    marginBottom: hp('3%'),
  },
  cardLineShort: {
    width: wp('20%'),
    height: hp('2.5%'),
    marginBottom: hp('1%'),
    borderRadius: 2,
  },
  cardLineMedium: {
    width: wp('50%'),
    height: hp('3.5%'),
    marginBottom: hp('1%'),
    borderRadius: 2,
  },
  cardLineSmall: {
    width: wp('30%'),
    height: hp('2.5%'),
    borderRadius: 2,
  },
  cardLineXsmall: {
    width: wp('22%'),
    height: hp('2.5%'),
    marginLeft: wp('1%'),
    borderRadius: 2,
  },
  rowLine: {
    flexDirection: 'row',
  },
  squareRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp('2%'),
    marginBottom: hp('1%'),
  },
  square: {
    width: wp('10%'),
    height: wp('10%'),
    borderRadius: 2,
  },
  rectangle: {
    width: wp('15%'),
    height: wp('10%'),
    borderRadius: 2,
  },
  circleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
  },
  circleWrapper: {
    alignItems: 'center',
    marginHorizontal: wp('2%'),
  },
  circle: {
    width: wp('12%'),
    height: wp('12%'),
    borderRadius: wp('6%'),
  },
  circleBar: {
    width: wp('8%'),
    height: hp('1.5%'),
    borderRadius: 2,
    marginTop: hp('1%'),
  },
  longBarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp('3%'),
  },
  longBar: {
    flex: 1,
    height: hp('1.8%'),
    borderRadius: 2,
  },
  dot: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
    marginLeft: wp('20%'),
  },
  dot1: {
    width: wp('7%'),
    height: wp('7%'),
    borderRadius: wp('3.5%'),
    marginLeft: wp('1%'),
  },
  profileCard: {
    alignItems: 'center',
    padding: wp('4%'),
    marginBottom: hp('3%'),
    borderWidth: 1.5,
    borderColor: Colors.background1,
    borderRadius: wp('4%'),
  },
  profileCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: wp('18%'),
    height: wp('18%'),
    borderRadius: wp('9%'),
    marginRight: wp('3%'),
  },
  profileCardLines: {
    marginLeft: wp('2%'),
  },
  profileLineShort: {
    width: wp('20%'),
    height: hp('2%'),
    borderRadius: 2,
    marginBottom: hp('1%'),
  },
  midLine: {
    flexDirection: 'row',
    marginBottom: hp('1%'),
  },
  profileLineXsmall: {
    width: wp('15%'),
    height: hp('1.8%'),
    borderRadius: 2,
  },
  profileLineXxsmall: {
    width: wp('10%'),
    height: hp('1.8%'),
    borderRadius: 2,
    marginLeft: wp('1%'),
  },
  profileLineMedium: {
    width: wp('30%'),
    height: hp('1.5%'),
    borderRadius: 2,
  },
  buttonBackground: {
    padding: wp('4%'),
    borderWidth: 1,
    borderColor: '#086DE1',
    borderRadius: wp('8%'),
    marginLeft: wp('8%'),
  },
  profileButton: {
    width: wp('12%'),
    height: hp('1.2%'),
    borderRadius: 4,
    backgroundColor: Colors.background1,
  },
  percentLine: {
    flexDirection: 'row',
    marginTop: hp('1.5%'),
  },
  bar: {
    height: hp('0.7%'),
    marginRight: wp('1%'),
    backgroundColor: '#086DE1',
    flex: 1,
  },
  profileBottom: {
    flexDirection: 'row',
    marginTop: hp('1.5%'),
    alignItems: 'center',
  },
  bottomSmallLine: {
    height: hp('2%'),
    width: wp('12%'),
    marginLeft: wp('1%'),
  },
  bottomXsmallLine: {
    height: hp('2%'),
    width: wp('15%'),
    marginLeft: wp('1%'),
  },
  bottomX2smallLine: {
    height: hp('2%'),
    width: wp('15%'),
    marginLeft: wp('12%'),
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp('3%'),
    alignItems: 'center',
  },
  footerCircle: {
    width: wp('4%'),
    height: wp('4%'),
    borderRadius: wp('2%'),
  },
  footerButton: {
    width: wp('18%'),
    height: hp('2.5%'),
    borderRadius: wp('5%'),
  },
  footerButtonSmall: {
    width: wp('12%'),
    height: hp('2.5%'),
    borderRadius: wp('5%'),
  },
  bottomCard: {
    padding: wp('4%'),
    borderRadius: wp('3%'),
  },
  bottomLine: {
    width: '100%',
    height: hp('1.5%'),
    borderRadius: wp('2%'),
    marginBottom: hp('1.5%'),
  },
});

export default FullSkeletonLoader;
