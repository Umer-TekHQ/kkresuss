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

const CARD_WIDTH = screenWidth * 0.87;
const CARD_HEIGHT = screenWidth * 0.26; 
const SPACING = screenWidth * 0.005;

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
        <View style={styles.iconcontainer}>
        <Image
          source={Images.vaulticon}
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
    marginRight: 15,
    },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#080C4C',
    borderRadius: 20,
    marginRight: SPACING,
    borderWidth: 1.5,
    borderColor: '#080C4C',
  },
  content: {
    flexDirection: 'row',
  },
  iconcontainer: {
    width: screenWidth * 0.22,
    height: screenWidth * 0.25,
    justifyContent: 'center',
    alignItems: 'center',
    // marginLeft: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    marginRight: 10,
    backgroundColor: '#10132C',
  },
  icon: {
    width: screenWidth * 0.1,
    height: screenWidth * 0.1,
    marginRight: 10,
    marginLeft: 10,
  },
  iconintro: {
    width: screenWidth * 0.05,
    height: screenWidth * 0.05,
    marginBottom: 20,
    tintColor: '#086DE1',
  },
  textContainer: {
    // backgroundColor: '#080C4C',
    flex: 1,
    height: '100%',
    width: '100%',
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
    color: '#2DD2FD',
    fontSize: 13,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});
