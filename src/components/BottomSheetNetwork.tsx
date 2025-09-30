import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  runOnJS,
  withTiming 
} from 'react-native-reanimated';

import { Images } from '../assets';
import { Colors } from '../theme/colors';

const MAX_TRANSLATE_Y = -180;

type Props = {
  visible: boolean;
  onClose: () => void;
};

const BottomSheetNetwork = ({ visible, onClose }: Props) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
  translateY.value = withTiming(visible ? MAX_TRANSLATE_Y : 0, {
    duration: 250,
  });
}, [visible]);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value += event.translationY;
      if (translateY.value > 0) translateY.value = 0;
      if (translateY.value < MAX_TRANSLATE_Y) translateY.value = MAX_TRANSLATE_Y;
    })
    .onEnd(() => {
      if (translateY.value > MAX_TRANSLATE_Y / 2) {
       runOnJS(onClose)();
      } else {
          translateY.value = withTiming(MAX_TRANSLATE_Y, {
        duration: 250,
      });
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  if (!visible) return null; 

return (
  <GestureHandlerRootView style={StyleSheet.absoluteFill}>
    <TouchableOpacity
      style={styles.overlay}
      activeOpacity={1}
      onPress={onClose}
      pointerEvents="auto"   
    />

    <GestureDetector gesture={panGesture}>
      <Animated.View
        style={[styles.bottomSheet, animatedStyle]}
        pointerEvents="auto"   
      >
        <View style={styles.handle} />
        <Text style={styles.sheetTitle}>Select Network(s)</Text>
        <View style={styles.divider} />

        <View style={styles.optionBox}>
          <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
            <Text style={styles.option}>Both Networks</Text>
            <Image source={Images.profileHeadLogo} style={styles.optionIcon1} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
            <Text style={styles.option}>Solana</Text>
            <Image source={Images.solanaLogo} style={styles.optionIcon} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionRow} activeOpacity={0.7}>
            <Text style={styles.option}>Base</Text>
            <Image source={Images.base} style={styles.optionIcon} />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </GestureDetector>
  </GestureHandlerRootView>
);


};

export default BottomSheetNetwork;

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.backgroundNetwork,
  },
  bottomSheet: {
    position: 'absolute',
    bottom: -180,
    height: 240,
    width: '100%',
    backgroundColor: Colors.background,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 10,
    zIndex: 100,
  },
  handle: {
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.fieldBorder,
    alignSelf: 'center',
    marginBottom: 10,
  },
  sheetTitle: {
    color: Colors.lightblue,
    textAlign: 'center',
    fontSize: 15,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  optionBox: {
    marginTop: 10,
  },
  option: {
    color: Colors.white,
    fontSize: 16,
    paddingVertical: 12,
    textAlign: 'center',
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background1,
  },
  optionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 2,
  },
  optionIcon: {
    width: 35,
    height: 25,
    resizeMode: 'contain',
  },
  optionIcon1: {
    resizeMode: 'contain',
    width: 35, 
    height: 25,
    marginRight: 5,
  },
});
