import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import styles from '../../styles/homestyles';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { ExploreButtons } from '../../components/ExploreButtons';
import { ExploreCard } from '../../components/ExploreCards';
import { exploreSections } from '../../mock/exploreData';
import { HeaderNav } from '../../components/HeaderNav';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { height: screenHeight } = Dimensions.get('window');

export const ExploreScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const scrollYRef = useRef(0); 
  const sectionPositions = useRef<{ [key: string]: number }>({});

  const stickyHeaderHeight = 60; 

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonPress = (sectionName: string) => {
    const y = sectionPositions.current[sectionName];
    if (y !== undefined && scrollRef.current) {
      const currentY = scrollYRef.current;
      if (Math.abs(currentY - y) < 2) {
        scrollRef.current.scrollTo({ y: y + 1, animated: false });
        setTimeout(() => {
          scrollRef.current?.scrollTo({ y, animated: true });
        }, 10);
      } else {
        scrollRef.current.scrollTo({ y, animated: true });
      }
    }
  };

  const onSectionLayout = (name: string, event: any) => {
    sectionPositions.current[name] = event.nativeEvent.layout.y - stickyHeaderHeight;
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickyHeaderIndices={[2]} 
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
        onScroll={(e) => {
          scrollYRef.current = e.nativeEvent.contentOffset.y;
        }}
      >
        <HeaderNav />

        <Text
          style={{
            fontSize: 40,
            lineHeight: 50,
            color: '#fff',
            marginHorizontal: wp('4%'),
            marginVertical: wp('4%')
          }}
        >
          Explore
        </Text>

        <View style={{ backgroundColor: styles.container.backgroundColor, zIndex: 10 }}>
          <ExploreButtons onPressAction={handleButtonPress} />
        </View>

        {loading ? (
          <SkeletonLoader variant="explore-card" />
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
                          ? navigation.navigate('bottomscreen')
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
          </View>
        )}
      </ScrollView>
    </View>
  );
};
