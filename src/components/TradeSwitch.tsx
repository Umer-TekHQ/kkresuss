import React, { useState, useEffect } from 'react';
import { Animated, StyleSheet, TouchableOpacity, View } from 'react-native';

import { Colors } from '../theme/colors';

interface CustomSwitchProps {
  value: boolean;
  onValueChange: (val: boolean) => void;
  disabled?: boolean;
}
const TradeSwitch = ({ value, onValueChange }: CustomSwitchProps) => {
  const [animatedValue] = useState(new Animated.Value(value ? 1 : 0));
  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: value ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [value]);
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [2, 24], 
  });

  return (
    <TouchableOpacity onPress={() => onValueChange(!value)} activeOpacity={0.8}>
      <View style={[styles.track, { backgroundColor: value ? Colors.back : Colors.background4}]}>
        <Animated.View style={[styles.thumb, { transform: [{ translateX }] }]} />
      </View>
    </TouchableOpacity>
  );
};

export default TradeSwitch;

const styles = StyleSheet.create({
  track: {
    width: 50,
    height: 26,
    borderRadius: 14,
    justifyContent: 'center',
  },
  thumb: {
    width: 24, 
    height: 24,
    borderRadius: 12,
    backgroundColor: Colors.white,
  },
});
