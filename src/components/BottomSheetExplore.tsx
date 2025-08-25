import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  interpolate,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export interface BottomSheetExploreRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('55.50%'),
  min: -hp('55.50%'),
  max: -hp('100%'),
};

const BottomSheetExplore = forwardRef<BottomSheetExploreRef>((props, ref) => {
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

  const rHeadingStyle = useAnimatedStyle(() => {
  const marginTop = interpolate(
    translateY.value,
    [minY.value, maxY.value], 
    [0, 50],                 
  );

  return {
    marginTop,
  };
});


  useAnimatedReaction(
    () => {
      const range = maxY.value - minY.value;
      const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));
      return progress;
    },
    (progress) => {
      runOnJS(setBlockingPointerEvents)(progress > 0.95);
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
      const shouldOpenFully = event.velocityY < -500 ||
        (event.velocityY > -200 && translateY.value < midPoint);
      if (shouldOpenFully) {
        translateY.value = withSpring(maxY.value, {
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      } else {
        translateY.value = withSpring(minY.value, {
          damping: 15,
          stiffness: 80,
          mass: 0.8,
          velocity: event.velocityY
        });
      }
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
        <View style={styles.lineExplore} />
        <Animated.Text style={[styles.headingPro, rHeadingStyle]}>
          Uniswap
        </Animated.Text>
        <Text style={styles.toppara}>
          Swap, earn, and build on the leading decentralized crypto trading protocol.
        </Text>
        <Text style={styles.bottompara}>
          UniSwap is a decentralized exchange that enables the trading of digital assets. UNI is
          the cryptocurrency the UniSwap platform uses. Anyone can earn UNI by agreeing to not
          sell or trade their crypto holdings. The UniSwap platform is governed by UNI holders
          in proportion to how much UNI they own.
        </Text>
        <View />
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 0.5,
    borderRightWidth: 0.2,
    borderLeftWidth: 0.2,
    borderColor: '#10178A',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#10132C',
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
  },
  lineExplore: {
    width: wp('15%'),
    height: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  headingPro: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '600',
    marginVertical: 8,
    marginBottom: 12,
    marginLeft: 15
  },
  toppara: {
    color: '#ffffff',
    marginLeft: 15,
    marginRight: 100,
    marginTop: 15,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    fontSize: 17,
  },
  bottompara: {
    color: '#ffffff',
    marginHorizontal: 15,
    fontSize: 20.5,
    marginTop: 15,
    letterSpacing: 1,
  },
});

export default BottomSheetExplore;
