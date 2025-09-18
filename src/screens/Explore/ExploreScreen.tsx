import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ExploreButtons } from '../../components/ExploreButtons';
import { ExploreCard } from '../../components/ExploreCards';
import ExploreSkeletonLoader from '../../components/ExploreSkeletonLoader';
import { HeaderNav } from '../../components/HeaderNav';
import { exploreSections } from '../../mock/exploreData';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      scrollRef.current.scrollTo({ y: y - buttonsHeight + hp('10%') , animated: true });
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
        <View style={styles.stickyHeader}>
          <HeaderNav />
          <Text style={styles.heading}>Explore</Text>
          <View onLayout={(e) => setButtonsHeight(e.nativeEvent.layout.height)}>
            <ExploreButtons onPressAction={handleButtonPress} activeSection={activeSection} />
          </View>
        </View>

        {loading ? (
          <ExploreSkeletonLoader />
        ) : (
          <View style={{ marginTop: 20 }}>
            {exploreSections.map((section, sectionIndex) => (
              <View
                key={sectionIndex}
                onLayout={(event) => onSectionLayout(section.section, event)}
              >
                <Text style={styles.sectionTitle}>{section.section}</Text>
                <View style={styles.cardRow}>
                  {section.data.map((item, cardIndex) => (
                    <TouchableOpacity
                      key={cardIndex}
                      onPress={() =>
                        item.title === 'Uniswap'
                          ? navigation.navigate('bottomScreen')
                          : null
                      }
                    >
                      <ExploreCard
                        title={item.title}
                        description={item.description}
                        image={item.image}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}

            <View style={{ height: 300 }} />
          </View>
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
  stickyHeader: {
    backgroundColor: Colors.background,
    zIndex: 10,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 12,
    marginHorizontal: wp('4%'),
  },
  heading: {
    fontSize: 30,
    lineHeight: 40,
    color: Colors.white,
    marginHorizontal: wp('4%'),
    marginVertical: wp('4%'),
    fontFamily: 'PlayfairDisplay-Bold',
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginBottom: 20,
    marginHorizontal: 5,
  },
});
