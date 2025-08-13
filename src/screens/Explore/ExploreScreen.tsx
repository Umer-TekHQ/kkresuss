import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { ExploreButtons } from '../../components/ExploreButtons';
import { ExploreCard } from '../../components/ExploreCards';
import { exploreSections } from '../../mock/exploreData';
import { HeaderNav } from '../../components/HeaderNav';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ExploreScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef<ScrollView>(null);
  const sectionPositions = useRef<{ [key: string]: number }>({});

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleButtonPress = (sectionName: string) => {
    const y = sectionPositions.current[sectionName];
    if (y !== undefined && scrollRef.current) {
      scrollRef.current.scrollTo({ y, animated: true });
    }
  };

  const onSectionLayout = (name: string, event: any) => {
    sectionPositions.current[name] = event.nativeEvent.layout.y - 60; 
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      <ScrollView
        ref={scrollRef}
        contentContainerStyle={{ paddingBottom: 20 }}
        stickyHeaderIndices={[2]} 
        showsVerticalScrollIndicator={false}
      >
        <HeaderNav />

        <Text
          style={{
            fontSize: 40,
            lineHeight: 50,
            marginBottom: 20,
            marginTop: 20,
            color: '#fff',
            marginHorizontal: wp('2%'),
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


const styles = StyleSheet.create ({
    container: {
    flex: 1,
    backgroundColor: '#01022C',
    // paddingLeft: 5,
  },
    sectionTitle: {
  color: '#fff',
  fontSize: 22,
  fontWeight: '400',
  marginBottom: 12,
  marginLeft: 15,
},
cardRow: {
  flexDirection: 'row',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  marginBottom: 20,
},
})
