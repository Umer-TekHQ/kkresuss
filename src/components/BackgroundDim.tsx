import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

interface BackgroundDimProps {
  isAtMax: Animated.SharedValue<boolean>;
}

const BackgroundDim: React.FC<BackgroundDimProps> = ({ isAtMax }) => {
  const dimStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtMax.value ? 0.5 : 0, { duration: 250 }),
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        StyleSheet.absoluteFillObject,
        { backgroundColor: 'black' },
        dimStyle,
      ]}
    />
  );
};

export default BackgroundDim;
