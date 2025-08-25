import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedReaction,
  runOnJS
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '../assets';

const securityItems = [
  { label: 'Advanced Verification', screen: 'Recovery' },
  { label: 'Recovery Phone', screen: 'Recovery' },
  { label: 'Insurance Coverage' },
  { label: 'Device Biometrics' },
  { label: 'Email Verification' },
];

export interface BottomSheetHomeRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('16.93%'),
  min: -hp('16.93%'),
  max: -hp('70.67%'),
};

const BottomSheetHome = forwardRef<BottomSheetHomeRef, { navigation: any }>(({ navigation }, ref) => {
  const translateY = useSharedValue(TRANSLATE_Y_CONFIG.initial);
  const context = useSharedValue({ y: 0 });
  const initialY = useSharedValue(TRANSLATE_Y_CONFIG.initial);
  const minY = useSharedValue(TRANSLATE_Y_CONFIG.min);
  const maxY = useSharedValue(TRANSLATE_Y_CONFIG.max);
  const dimOpacity = useSharedValue(0);
  const [blockingPointerEvents, setBlockingPointerEvents] = useState(false);
  const isOpen = useSharedValue(false);

  const openSheet = () => {
    translateY.value = withSpring(maxY.value, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
    isOpen.value = true;
    runOnJS(setBlockingPointerEvents)(true);
  };

  const closeSheet = () => {
    translateY.value = withSpring(initialY.value, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
    isOpen.value = false;
    runOnJS(setBlockingPointerEvents)(false);
  };

  useImperativeHandle(ref, () => ({ openSheet, closeSheet }));

  const dimStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [maxY.value, initialY.value],
      [0.5, 0],
      Extrapolate.CLAMP
    );
    dimOpacity.value = opacity;
    return { opacity };
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

  const responsiveHomeHeadMargin = Math.max(0.5, wp('0.5%'));
  const responsiveHomeNumbersMargin = Math.max(30, wp('13%'));

  return (
    <>
      <Animated.View
        pointerEvents="none"
        style={[StyleSheet.absoluteFillObject, { backgroundColor: 'black' }, dimStyle]}
      />

      {blockingPointerEvents && (
        <View 
          style={StyleSheet.absoluteFill} 
          pointerEvents="auto"
          onStartShouldSetResponder={() => true} 
          onMoveShouldSetResponder={() => true} 
        />
      )}

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.container, rStyle]} pointerEvents="box-none">
          <TouchableOpacity activeOpacity={1} onPress={openSheet}>
            <View style={styles.lineHome} />
            <View style={[styles.head, { marginHorizontal: responsiveHomeHeadMargin }]}>
              <Image source={Images.bottomhead} style={styles.headImg} />
              <Text style={styles.heading}>My Security Score</Text>
              <Text style={[styles.numbers, { marginLeft: responsiveHomeNumbersMargin }]}>2/5</Text>
              <TouchableOpacity onPress={closeSheet}>
                {isOpen.value ? (
                  <Animated.Image source={Images.whitecross} style={styles.upImg} />
                ) : (
                  <Animated.Image source={Images.up} style={styles.upImg} />
                )}
              </TouchableOpacity>
            </View>
            <View style={styles.Liner}>
              <LinearGradient
                colors={['#2B36E4', '#CEB55B']}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 0 }}
                style={styles.line1}
              />
              {[...Array(3)].map((_, i) => (
                <View key={i} style={styles.line} />
              ))}
            </View>
            <View style={styles.Lists}>
              {securityItems.map((item, i) => (
                <View style={styles.list} key={i}>
                  <TouchableOpacity onPress={item.screen ? () => navigation.navigate(item.screen) : undefined}>
                    <View style={styles.L1}>
                      <Image source={i < 3 ? Images.checked : Images.checked1} style={styles.img1} />
                      <Text style={styles.T1}>{item.label}</Text>
                      {i === 2 && <Image source={Images.probadge} style={styles.proBdg} />}
                      {i < 3 && (
                        <Image
                          source={Images.back}
                          style={[
                            styles.backBtn,
                            i === 1 && styles.backBtn1,
                            i === 2 && styles.backBtn2,
                          ]}
                        />
                      )}
                    </View>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
              <View style={styles.btnSty}>
                <Image source={Images.secure1} style={styles.secure} />
                <Text style={styles.btnText}>Manage In Settings</Text>
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        </Animated.View>
      </GestureDetector>
    </>
  );
});

const styles = StyleSheet.create({
  container: {
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#030A74',
    position: 'absolute',
    top: hp('100%'),
    borderRadius: 15,
  },
  lineHome: {
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#0734A9',
    alignSelf: 'center',
    marginTop: 5,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  head: {
    flexDirection: 'row',
    marginTop: 5,
    marginBottom: 7,
    textAlign: 'center',
    alignItems: 'center',
  },
  headImg: {
    padding: 12,
    marginLeft: 15,
  },
  heading: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 6,
    marginLeft: 30,
  },
  numbers: {
    marginLeft: 60,
    marginTop: 5,
    fontSize: 18,
    color: 'gold',
  },
  upImg: {
    marginLeft: 15,
    marginTop: 5,
  },
  Liner: {
    flexDirection: 'row',
    marginHorizontal: 10,
  },
  line1: {
    width: 120,
    height: 4,
    alignSelf: 'center',
    backgroundColor: 'gold',
    borderRadius: 2,
    marginHorizontal: 4,
  },
  line: {
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#10132C',
    alignSelf: 'center',
    marginVertical: 15,
    marginHorizontal: 8,
    borderRadius: 2,
  },
  Lists: {},
  list: {
    marginHorizontal: 12,
    marginBottom: 15,
  },
  L1: {
    flexDirection: 'row',
  },
  img1: {
    marginTop: 4,
  },
  T1: {
    marginTop: 5,
    marginLeft: 10,
    fontSize: 20,
    color: 'white',
  },
  proBdg: {
    marginLeft: 45,
    marginTop: 10,
  },
  backBtn: {
    fontSize: 10,
    marginLeft: 75,
    marginTop: 12,
    tintColor: '#086CE1',
  },
  backBtn1: {
    marginLeft: 128,
  },
  backBtn2: {
    marginLeft: 10,
  },
  button: {
    flexDirection: 'row',
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: 'lightblue',
    width: 175,
    borderRadius: 25,
    marginVertical: 10,
  },
  btnSty: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  secure: {
    marginTop: 8,
    width: 19,
    height: 24,
  },
  btnText: {
    textAlign: 'center',
    padding: 10,
    color: 'white',
  },
});

export default BottomSheetHome;
