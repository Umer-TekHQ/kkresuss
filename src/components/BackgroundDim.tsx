import React from 'react';
import { StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import { Colors } from '../theme/colors';

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
        styles.background,
        dimStyle,
      ]}
    />
  );
};

export default BackgroundDim;

const styles = StyleSheet.create({
  background:{
    backgroundColor: Colors.black
  }
})
