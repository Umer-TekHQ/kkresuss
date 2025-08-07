import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  ViewToken,
} from 'react-native';
import { Images } from '../assets';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = screenWidth * 0.84;
const CARD_HEIGHT = screenWidth * 0.26; 
const SPACING = screenWidth * 0.05;

const data = [1, 2, 3];

export default function IntroducingCards() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: ViewToken[] }) => {
      if (viewableItems.length > 0) {
        setCurrentIndex(viewableItems[0].index ?? 0);
      }
    }
  ).current;

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const renderItem = () => (
    <View style={styles.card}>
      <View style={styles.content}>
        <Image
          source={Images.vaulticon}
          style={styles.icon}
          resizeMode="contain"
        />
        <View style={styles.divider} />
        <View style={styles.textContainer}>
          <Text style={styles.title}>Introducing Kresus Pro</Text>
          <View style={styles.subtitleRow}>
            <Text style={styles.subtitle}>
              $10K in insurance and 350{'\n'}monthly gasless transactions
            </Text>
            <Image
              source={Images.back}
              style={styles.iconintro}
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
        pagingEnabled
        snapToInterval={CARD_WIDTH + SPACING}
        decelerationRate="fast"
        contentContainerStyle={{ paddingHorizontal: SPACING }}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewConfigRef}
      />

      <View style={styles.dotsContainer}>
        {data.map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              { backgroundColor: i === currentIndex ? '#3C6FF8' : '#888DA7' },
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
    alignItems: 'center',
  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#0D0C2B',
    borderRadius: 20,
    marginRight: SPACING,
    justifyContent: 'center',
    paddingHorizontal: 5,
    borderWidth: 1,
    borderColor: '#464688ff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    marginRight: 10,
  },
  iconintro: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    marginLeft: 10,
    marginBottom: 20,
  },
  divider: {
    height: '100%',
    width: 1,
    backgroundColor: '#464688ff',
    marginRight: 10,
  },
  textContainer: {
    backgroundColor: '#080C4C',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    paddingHorizontal: 5,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 5,
  },
  subtitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 5,
  },
  subtitle: {
    color: '#B1B6CC',
    fontSize: 13,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
