import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Colors } from '../theme/colors';

export interface BottomSheetProfileBottomRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('55.56%'),
  min: -hp('55.56%'),
  max: -hp('100%'),
};

const BottomSheetProfileBottom = forwardRef<BottomSheetProfileBottomRef>((props, ref) => {
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

const rHeadingStyle = useAnimatedStyle(() => {
  const range = maxY.value - minY.value;
  const progress = Math.max(
    0,
    Math.min(1, (translateY.value - minY.value) / range)
  );

  const marginLeft = interpolate(
    translateY.value,
    [minY.value, maxY.value],
    [15, 90],
    Extrapolate.CLAMP
  );

  return {
    fontSize: interpolate(progress, [0, 1], [26, 18]),
    marginLeft,
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
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.Text style={[styles.headingPro, rHeadingStyle]}>
            Supported Networks
          </Animated.Text>
        </View>
        <Text style={styles.topParagraph}>
          Kresus wallet is designed specifically for seamless transactions with tokens and NFTs on the Base network, as well as tokens on the Solana networks. It's crucial to ensure that you are sending and receiving assets exclusively on these networks, as transactions on other networks-- like Ethereum MainNet--can lead to the permanent loss of your assets.
        </Text>
        <Text style={styles.heading}>Double Check</Text>
        <Text style={styles.topParagraph}>
          Always double-check the networks compatibility before making a transfer to protect your valuable tokens and NFTs. If you have any questions or need assistance, our support team is here to help.
        </Text>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: Colors.backgroundAlt,
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
  },
  lineProfile: {
    width: 80,
    height: 4,
    backgroundColor: Colors.background4,
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 2,
  },
  headingPro: {
    color: Colors.white,
    fontSize: 26,
    marginBottom: 12,
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'PlayfairDisplay-Bold', 
  },
  topParagraph: {
    color: Colors.lightblue,
    fontSize: 20,
    marginLeft: 15,
    marginRight: 20,
    marginTop: 20,
  },
  heading: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 15,
    color: Colors.white,
  },
  backButton: {
    marginLeft: 10,
    marginTop: 15,
    paddingVertical: 5,
  }
});

export default BottomSheetProfileBottom;
