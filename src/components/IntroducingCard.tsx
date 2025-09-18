import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  ViewToken,
} from 'react-native';

import { Images } from '../assets';

import { Colors } from '../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = screenWidth * 0.88; 
const CARD_HEIGHT = screenWidth * 0.26;
const SPACING = 35; 

const data = [1, 2, 3];

export default function IntroducingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = () => (
    <View style={[styles.card, { marginRight: SPACING }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Image
            source={Images.vaultIcon}
            style={styles.icon}
            resizeMode="contain"
          />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>Introducing Kresus Pro</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>
              $10K in insurance and 350{'\n'}monthly gasless transactions
            </Text>
            <Image
              source={Images.introducingArrow}
              style={styles.iconIntro}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        snapToInterval={CARD_WIDTH + SPACING} 
        decelerationRate="fast"
        snapToAlignment="center"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - CARD_WIDTH) / 2.5, 
        }}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />

      <View style={styles.dotsContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? '#7AB7FD' : '#1B45B0' },
            ]}
          />
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: Colors.background2,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.background2,
    marginTop: 15,
    marginBottom: 15,
  },
  content: {
    flexDirection: 'row',
  },
  iconContainer: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 10,
    backgroundColor: Colors.background,
  },
  icon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    marginRight: 10,
    marginLeft: 10,
  },
  iconIntro: {
    width: screenWidth * 0.09,
    height: screenWidth * 0.05,
    marginBottom: 20,
    tintColor: Colors.back,
  },
  textContainer: {
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 5,
  },
  title: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 16,
    marginLeft: 5,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  subtitle: {
    color: Colors.lightblue,
    fontSize: 14,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 5,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
