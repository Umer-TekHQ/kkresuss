import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ExploreButtons } from "./ExploreButtons";
import { HeaderNav } from "./HeaderNav";
import { Colors } from '../theme/colors';

type Props = {
  activeSection: string;
  handleButtonPress: (sectionName: string) => void;
  setButtonsHeight: (h: number) => void;
};

const ExploreHeader = ({ activeSection, handleButtonPress, setButtonsHeight }: Props) => (
  <View style={styles.stickyHeader}>
    <HeaderNav />
    <Text style={styles.heading}>Explore</Text>
    <View onLayout={(e) => setButtonsHeight(e.nativeEvent.layout.height)}>
      <ExploreButtons onPressAction={handleButtonPress} activeSection={activeSection} />
    </View>
  </View>
);

const styles = StyleSheet.create({
  stickyHeader: {
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  heading: {
    fontSize: 30,
    lineHeight: 40,
    color: Colors.white,
    marginHorizontal: wp('4%'),
    marginVertical: wp('4%'),
    fontFamily: 'PlayfairDisplay-Bold',
  },
});

export default ExploreHeader;
