import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
  TouchableOpacity,
  ViewToken,
} from 'react-native';
import { Images } from '../assets';

const { width: screenWidth } = Dimensions.get('window');

const CARD_WIDTH = 360;
const CARD_HEIGHT = 100;
const SPACING = 15;

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
        <View>
        <Image
          source={Images.vaulticon} 
          style={styles.icon}
          resizeMode="contain"
        />
        </View>
        <View style={{height: 100, width: 1, backgroundColor: '#464688ff',}}></View>
        <View style={{ backgroundColor: '#080C4C', width: '87%', height: '92%', justifyContent: 'center',  borderTopRightRadius: 20, borderBottomRightRadius: 20,}}>
          <Text style={styles.title}>Introducing Kresus Pro</Text>
          <Text style={styles.subtitle}>$10K in insurance and 350{'\n'}monthly gasless transactions</Text>
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
        contentContainerStyle={{ paddingHorizontal: (screenWidth - CARD_WIDTH) / 9 }}
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
    // marginTop: 10,
    marginBottom: 20,
    alignItems: 'center',

  },
  card: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    backgroundColor: '#0D0C2B',
    borderRadius: 20,
    marginHorizontal: SPACING / 40,
    marginRight: 10,
    justifyContent: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#464688ff',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    width: 40,
    height: 40,
    marginRight: 15,
  },
  title: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
    marginLeft: 15,
  },
  subtitle: {
    color: '#B1B6CC',
    fontSize: 13,
    marginLeft: 15,
  },
  dotsContainer: {
    flexDirection: 'row',
    marginTop: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 5,
  },
});