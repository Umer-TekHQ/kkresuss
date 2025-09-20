import React, { useEffect, useState, useRef } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';

import ExploreHeader from '../../components/exploreHeader';
import ExploreSections from '../../components/exploreSection';
import ExploreSkeletonLoader from '../../components/ExploreSkeletonLoader';
import { exploreSections } from '../../mock/exploreData';
import { Colors } from '../../theme/colors';

export const ExploreScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0);
  const sectionPositions = useRef<{ [key: string]: number }>({});
  const [activeSection, setActiveSection] = useState('Trade');
  const [buttonsHeight, setButtonsHeight] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleScroll = (e: any) => {
    scrollYRef.current = e.nativeEvent.contentOffset.y;

    const positions = sectionPositions.current;
    const sortedSections = Object.entries(positions).sort((a, b) => a[1] - b[1]);

    let current = sortedSections[0][0];
    for (const [name, y] of sortedSections) {
      if (scrollYRef.current >= y - buttonsHeight - 10) {
        current = name;
      }
    }
    if (current !== activeSection) {
      setActiveSection(current);
    }
  };

  const handleButtonPress = (sectionName: string) => {
    const y = sectionPositions.current[sectionName];
    if (y !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({ y: y - buttonsHeight + hp('10%'), animated: true });
    }
  };

  const onSectionLayout = (name: string, event: any) => {
    sectionPositions.current[name] = event.nativeEvent.layout.y;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickyHeaderIndices={[0]}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={handleScroll}
      >
        <ExploreHeader
          activeSection={activeSection}
          handleButtonPress={handleButtonPress}
          setButtonsHeight={setButtonsHeight}
        />

        {loading ? (
          <ExploreSkeletonLoader />
        ) : (
          <ExploreSections
            exploreSections={exploreSections}
            onSectionLayout={onSectionLayout}
            navigation={navigation}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
  },
});

export default ExploreScreen;
