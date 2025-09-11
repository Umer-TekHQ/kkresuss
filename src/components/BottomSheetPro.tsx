import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions,} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
  interpolate,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../theme/colors';

export interface BottomSheetProRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('55.56%'),
  min: -hp('55.56%'),
  max: -hp('100%'),
};

const BottomSheetPro = forwardRef<BottomSheetProRef>(({ onBackPress }: any, ref) => {
  const translateY = useSharedValue(TRANSLATE_Y_CONFIG.initial);
  const context = useSharedValue({ y: 0 });
  const initialY = useSharedValue(TRANSLATE_Y_CONFIG.initial);
  const minY = useSharedValue(TRANSLATE_Y_CONFIG.min);
  const maxY = useSharedValue(TRANSLATE_Y_CONFIG.max);
  const [blockingPointerEvents, setBlockingPointerEvents] = useState(false);

  const openSheet = () => {
    translateY.value = withSpring(maxY.value, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
    setBlockingPointerEvents(true);
  };
  const closeSheet = () => {
    translateY.value = withSpring(initialY.value, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
    setBlockingPointerEvents(false);
  };
  useImperativeHandle(ref, () => ({ openSheet, closeSheet }));

  useAnimatedReaction(
    () => {
      const range = maxY.value - minY.value;
      const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));
      return progress;
    },
    (progress) => {
      runOnJS(setBlockingPointerEvents)(progress > 0.85);
    }
  );

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(
        Math.min(event.translationY + context.value.y, minY.value),
        maxY.value
      );
    })
    .onEnd((event) => {
      const midPoint = (minY.value + maxY.value) / 2;
      const shouldOpenFully =
        event.velocityY < -500 || (event.velocityY > -200 && translateY.value < midPoint);
      if (shouldOpenFully) {
        translateY.value = withSpring(maxY.value, {
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY,
        });
      } else {
        translateY.value = withSpring(minY.value, {
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY,
        });
      }
    });
  const headingAnimatedStyle = useAnimatedStyle(() => {
  const range = maxY.value - minY.value;
  const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));

  return {
    fontSize: interpolate(progress, [0, 1], [30, 19]),
    transform: [
      { translateY: interpolate(progress, [0, 1], [0, -5]) },
      { translateX: interpolate(progress, [0, 1], [0, 35]) },
    ],
  };
});

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  useEffect(() => {
    const handler = () => {
      initialY.value = TRANSLATE_Y_CONFIG.initial;
      minY.value = TRANSLATE_Y_CONFIG.min;
      maxY.value = TRANSLATE_Y_CONFIG.max;
    };
    const sub = Dimensions.addEventListener('change', handler);
    return () => {
      if (sub && typeof sub.remove === 'function') sub.remove();
    };
  }, []);

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rStyle]}>
        <View style={styles.line} />
        <Animated.View style={styles.headerRow}>
          <Animated.Text style={[styles.headingPro, headingAnimatedStyle]}>
            See What the Pros are Buying
          </Animated.Text>
          <View style={{ width: 20 }} />
        </Animated.View>
        <Text style={styles.bottomParagraph}>
          Sourced from on-chain data, 'Top Buys' reveals which coins historically profitable
          traders are buying right now, to help you find potentially winning trades ahead of
          the rest. Please conduct your own research before making any trades.
        </Text>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: Colors.background,
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
    borderTopWidth: 1,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.background4
  },
  line: {
    position: 'absolute',
    width: 55,
    height: 4,
    backgroundColor: Colors.background4,
    alignSelf: 'center',
    borderRadius: 4,
    marginTop: 10,
  },
  headerRow: {
    flexDirection: 'row',
    marginRight: 20,    
  },
  backIcon: {
    width: 15,
    height: 15,
    marginRight: 25,
    marginLeft: 25,
    marginTop: 30,
    tintColor: 'white',
  },
  headingPro: {
    color: Colors.white,
    marginTop: 28,
    marginLeft: 15
  },
  bottomParagraph: {
    color: Colors.lightblue,
    marginHorizontal: 15,
    marginTop: 25,
    fontSize: 19,
  },
});

export default BottomSheetPro;
