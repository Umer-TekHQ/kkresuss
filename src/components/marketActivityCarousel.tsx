import React from 'react';
import { FlatList, Dimensions, View } from 'react-native';

import { MarketActivityCard } from "./MarketActivityCard";

const MarketActivityCarousel = () => {
  const { width: screenWidth } = Dimensions.get('window');
  const CARD_WIDTH = screenWidth * 0.85;

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <FlatList
        data={[1, 2]}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => `market-${index}`}
        renderItem={() => <MarketActivityCard />}
        snapToInterval={Dimensions.get('window').width / 1}
        snapToAlignment="center"
        decelerationRate="fast"
        contentContainerStyle={{
          paddingHorizontal: (screenWidth - CARD_WIDTH) / 4,
        }}
      />
    </View>
  );
};

export default MarketActivityCarousel;
