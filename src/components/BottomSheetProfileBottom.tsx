import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, Image } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  useAnimatedReaction,
  runOnJS,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';
import { Images } from '../assets';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    [0, 60],
    Extrapolate.CLAMP
  );

  return {
    fontSize: interpolate(progress, [0, 1], [30, 19]),
    marginLeft,
  };
});


  const rLineStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [minY.value, maxY.value],
      [1, 0],
      Extrapolate.CLAMP
    );
    return { opacity };
  });

  const rBackButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [minY.value, maxY.value],
      [0, 1],  
      Extrapolate.CLAMP
    );
    return { opacity };
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
        
        <Animated.View style={[styles.lineProfile, rLineStyle]} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Animated.View style={[rBackButtonStyle]}>
            <TouchableOpacity onPress={closeSheet} style={styles.backButton}>
              <Text style={{ color: 'white', fontSize: 16 }}>
                <Image
                  source={Images.backarrow}
                  style={styles.backButton}
                />
              </Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.Text style={[styles.headingPro, rHeadingStyle]}>
            Supported Networks
          </Animated.Text>
        </View>

        <Text style={styles.toppara1}>
          Kresus wallet is designed specifically for seamless transactions with tokens and NFTs on the Base network, as well as tokens on the Solana networks. It's crucial to ensure that you are sending and receiving assets exclusively on these networks, as transactions on other networks-- like Etherium MainNet--can lead to the permanent loss of your assets.
        </Text>
        <Text style={styles.heading1}>Double Check</Text>
        <Text style={styles.toppara1}>
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
    backgroundColor: '#01021D',
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
  },
  lineProfile: {
    width: 80,
    height: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginTop: 15,
    borderRadius: 2,
  },
  headingPro: {
    color: '#ffffff',
    fontSize: 30,
    marginBottom: 12,
    marginHorizontal: 15,
    marginTop: 20,
    fontFamily: 'PlayfairDisplay-Bold', 
  },
  toppara1: {
    color: '#A2C5EF',
    fontSize: 20,
    marginLeft: 15,
    marginRight: 20,
    marginTop: 20,
  },
  heading1: {
    marginTop: 20,
    marginLeft: 15,
    fontSize: 15,
    color: '#ffffff',
  },
  backButton: {
    marginLeft: 10,
    marginTop: 15,
    paddingVertical: 5,
  }
});

export default BottomSheetProfileBottom;
