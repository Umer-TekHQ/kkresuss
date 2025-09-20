import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import {
  GestureDetector,
  Gesture,
  GestureHandlerRootView,
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import {Images} from '../assets';
import { Colors } from '../theme/colors';

const MAX_TRANSLATE_Y = -180;

const BottomSheetBase = () => {
  const translateY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateY.value += event.translationY   ;
      if (translateY.value > 0) translateY.value = 0;
      if (translateY.value < MAX_TRANSLATE_Y) translateY.value = MAX_TRANSLATE_Y;
    })
    .onEnd(() => {
      if (translateY.value < MAX_TRANSLATE_Y / 2) {
        translateY.value = withSpring(MAX_TRANSLATE_Y);
      } else {
        translateY.value = withSpring(0);
      }
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFill}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles.bottomSheet, animatedStyle]}>
          <View style={styles.handle} />
          <Text style={styles.sheetTitle}>Select Network</Text>
           <View style={styles.divider} />
          <View style={styles.optionBox}>
  <View style={styles.optionRow}>
    <Text style={styles.option}>Both Network</Text>
    <Image source={Images.bothSolanaBase} style={styles.optionIcon} />
  </View>

  
  <View style={styles.optionRow}>
    <Text style={styles.option}>Solana</Text>
    <Image source={Images.solana} style={styles.optionIcon} />
  </View>

  
  <View style={styles.optionRow}>
    <Text style={styles.option}>Base</Text>
    <Image source={Images.base} style={styles.optionIcon} />
  </View>
</View>


        </Animated.View>
      </GestureDetector>
    </GestureHandlerRootView>
  );
};

export default BottomSheetBase;


const styles = StyleSheet.create({
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
    backgroundColor: Colors.disabled,
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
    backgroundColor: Colors.background2,
  },
  optionRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingVertical: 2,
},

optionIcon: {
  width: 24,
  height: 24,
  resizeMode: 'contain',
},

});
