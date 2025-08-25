import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  useDerivedValue,
  runOnJS,
  useAnimatedReaction
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '../assets';

export interface BottomSheetProfileRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('9%'),
  min: -hp('9%'),
  max: -hp('50%'),
};

const BottomSheetProfile = forwardRef<BottomSheetProfileRef, { navigation: any }>(({
  navigation
}, ref) => {
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

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));
  const isAtMax = useDerivedValue(() => translateY.value === maxY.value);
  const logoAnimatedStyle = useAnimatedStyle(() => ({
    opacity: withTiming(isAtMax.value ? 0 : 1),
  }));
  const LOGO_WIDTH = 45;
  const LOGO_MARGIN = 8;
  const headingAnimatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(isAtMax.value ? -(LOGO_WIDTH + LOGO_MARGIN) : 0),
      },
    ],
  }));
    const arrowStyle = useAnimatedStyle(() => {
      const range = maxY.value - minY.value;
      const progress = Math.max(0, Math.min(1, (translateY.value - minY.value) / range));
      const rotateDeg = progress * 180; 
      return { transform: [{ rotate: `${rotateDeg}deg` }] };
    });

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
        <View style={styles.headProfileRow}>
          <Animated.Image
            source={Images.profileheadlogo}
            style={[styles.headimgP, logoAnimatedStyle]}
          />
          <Animated.Text style={[styles.headingP, headingAnimatedStyle]}>
            Supported Networks
          </Animated.Text>
          <Animated.Image source={Images.up} style={[styles.upimgP, arrowStyle]} />
        </View>
        <View style={styles.l1}>
          <View style={styles.rowLeft}>
            <Image source={Images.base} />
            <Text style={styles.l1text}> Base Network</Text>
          </View>
          <Text style={styles.trailingText}>Crypto and NFTs</Text>
        </View>
        <View style={styles.l12}>
          <View style={styles.rowLeft}>
            <Image source={Images.solanalogo} style={styles.solanalogo} />
            <Text style={styles.l1textS}> Solana Network</Text>
          </View>
          <Text style={styles.trailingText}>Crypto only</Text>
        </View>
        <Text style={styles.bottomtext}>
          Do not sent assets over Ethereum mainnets or they will be lost.
        </Text>
        <TouchableOpacity
          style={styles.LMBtn}
          onPress={() => {
            navigation.navigate('ProfileBottom');
          }}
        >
          <Text style={{ color: 'white' }}>Learn More</Text>
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
});

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#10132C',
    position: 'absolute',
    top: hp('100%'),
  },
  headProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginTop: 5,
    marginBottom: 7,
  },
  headimgP: {
    padding: wp('3%'),
    marginTop: 5,
    width: wp('9%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  headingP: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    flex: 1,
    marginLeft: wp('5%'),
  },
  upimgP: {
    marginTop: 5,
    width: 28,
    height: 25,
    tintColor: '#4898F3',
  },
  l1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    paddingVertical: 20,
    borderTopRightRadius: 20,
  },
  l12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  l1text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  l1textS: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
  trailingText: {
    color: 'lightblue',
    marginTop: 2,
    fontSize: 15,
    textAlign: 'right',
  },
  solanalogo: {
    width: 20,
    height: 20,
  },
  bottomtext: {
    color: 'lightblue',
    marginHorizontal: wp('5%'),
    marginTop: 15,
  },
  LMBtn: {
    backgroundColor: '#0a0a23',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    borderRadius: 20,
    borderColor: '#4898F3',
    borderWidth: 1,
    marginTop: 15,
  },
});

export default BottomSheetProfile;
