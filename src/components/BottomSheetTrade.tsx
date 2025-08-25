import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import SwipeButton from './SwipeButton';
import { Images } from '../assets';
import { useAppSelector } from '../store/hooks';

export interface BottomSheetTradeRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('5%'),
  min: -hp('10%'),
  max: -hp('74.07%'),
};

const BottomSheetTrade = forwardRef<BottomSheetTradeRef>((props, ref) => {
  const { token1, token2, amount1, amount2 } = useAppSelector(state => state.trade);
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
      runOnJS(setBlockingPointerEvents)(progress > 0.05); 
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

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [initialY.value, maxY.value],
      [0, 1],
      Extrapolate.CLAMP
    );
    return { opacity };
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
    <View style={StyleSheet.absoluteFill} pointerEvents={blockingPointerEvents ? 'auto' : 'none'}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          { backgroundColor: 'rgba(0,0,0,0.6)' },
          overlayStyle,
        ]}
      />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.tradebottomsheet, rStyle, { paddingTop: hp('1%') }]}>
          <View style={[styles.lineTB, { width: wp('15%'), height: hp('0.5%'), marginTop: hp('1%') }]} />
          <View style={[styles.head, { marginBottom: hp('1.5%') }]}>
            <Image
              source={Images.tradebottom}
              style={[
                styles.headimg,
                { width: wp('4%'), height: hp('2.5%'), marginLeft: wp('3%'), marginTop: hp('1%') },
              ]}
            />
            <Text style={[styles.headingTB, { fontSize: wp('4.5%'), marginLeft: wp('4%') }]}>
              Transaction Ready
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
              <Image
                source={Images.pros}
                style={[
                  styles.closeIcon,
                  { width: wp('6%'), height: hp('5%'), marginRight: wp('3%') },
                ]}
              />
            </TouchableOpacity>
          </View>

          {token1 && token2 && (
            <>
              <View style={styles.inputfields}>
                <View
                  style={[
                    styles.tokenInputContainer,
                    { width: wp('90%'), height: hp('10%'), marginVertical: hp('1%') },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelText,
                      { fontSize: wp('3.5%'), color: '#ADD2FD', marginBottom: hp('0.5%') },
                    ]}
                  >
                    TRADING
                  </Text>
                  <View style={styles.tokenDisplay}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Text
                        style={[
                          styles.tradeAmount,
                          { fontSize: wp('5%'), textAlign: 'right' },
                        ]}
                      >
                        {amount1}
                      </Text>
                      <Text
                        style={[
                          styles.tokenSymbol,
                          { fontSize: wp('4%'), marginTop: hp('0.5%') },
                        ]}
                      >
                        {token1.abbreviation}
                      </Text>
                    </View>
                    <Image
                      source={token1.logo}
                      style={[styles.tokenLogo, { width: wp('10%'), height: wp('10%') }]}
                    />
                  </View>
                </View>

                <View style={styles.arrowContainer}>
                  <Image
                    source={Images.downarroww}
                    style={[styles.downarrow, { width: wp('3%'), height: hp('2%') }]}
                  />
                </View>

                <View
                  style={[
                    styles.tokenInputContainer,
                    { width: wp('90%'), height: hp('10%'), marginVertical: hp('1%') },
                  ]}
                >
                  <Text
                    style={[
                      styles.labelText,
                      { fontSize: wp('3.5%'), color: '#ADD2FD', marginBottom: hp('0.5%') },
                    ]}
                  >
                    FOR
                  </Text>
                  <View style={styles.tokenDisplay}>
                    <View style={{ flexDirection: 'column', alignItems: 'flex-end' }}>
                      <Text
                        style={[
                          styles.tradeAmount,
                          { fontSize: wp('5%'), textAlign: 'right' },
                        ]}
                      >
                        {amount2}
                      </Text>
                      <Text
                        style={[
                          styles.tokenSymbol,
                          { fontSize: wp('4%'), marginTop: hp('0.5%'), marginRight: wp('2%') },
                        ]}
                      >
                        {token2.abbreviation}
                      </Text>
                    </View>
                    <Image
                      source={token2.logo}
                      style={[styles.tokenLogo, { width: wp('10%'), height: wp('10%') }]}
                    />
                  </View>
                </View>
              </View>

              <View
                style={[
                  styles.feescontainer,
                  { marginHorizontal: wp('5%'), paddingVertical: hp('2%') },
                ]}
              >
                <Text style={[styles.fees, { fontSize: wp('4.5') }]}>Fees</Text>
                <Text style={[styles.fees, { fontSize: wp('4.5%') }]}>1.73144653 SNORT</Text>
              </View>

              <Text
                style={[
                  styles.bottomtext1,
                  { fontSize: wp('4.5%'), marginTop: hp('1%') },
                ]}
              >
                Kresus covers your network fee
              </Text>

              <View style={{ marginTop: hp('1.5%') }}>
                <SwipeButton
                  placeholder="Swipe to Trade"
                  onNavigate={() => {
                    translateY.value = withSpring(0, { damping: 50 });
                  }}
                />
              </View>
            </>
          )}
        </Animated.View>
      </GestureDetector>
    </View>
  );
});

const styles = StyleSheet.create({
  tradebottomsheet: {
    borderRadius: 35,
    borderTopWidth: 2,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: '#10178A',
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: '#01032C',
    position: 'absolute',
    top: hp('100%'),
  },
  lineTB: {
    width: 55,
    height: 4,
    marginLeft: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginTop: 15,
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
  headimg: {
    padding: 12,
    marginLeft: 15,
  },
  headingTB: {
    color: '#2ED459',
    fontSize: 15,
    marginTop: 6,
    marginLeft: 20,
  },
  closeButton: {
    position: 'absolute',
    right: 3,
    top: 0,
    padding: 5,
  },
  closeIcon: {
    tintColor: 'lightblue',
  },
  inputfields: {
    alignItems: 'center',
  },
  tokenInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#4898F3',
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  labelText: {
    letterSpacing: 0.5,
  },
  tokenDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeAmount: {
    color: '#FFF',
    fontSize: 24,
    marginRight: 10,
  },
  tokenLogo: {
    width: 40,
    height: 40,
    borderRadius: 15,
    marginRight: 8,
  },
  tokenSymbol: {
    color: '#fff',
    fontSize: 12,
    marginRight: 4,
    letterSpacing: 0.5,
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 15,
  },
  downarrow: {
    width: 12,
    height: 18,
    marginLeft: 15,
  },
  feescontainer: {
    flexDirection: 'row',
    marginTop: 20,
    marginHorizontal: 22,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#28569B',
    paddingVertical: 20,
    justifyContent: 'space-between',
  },
  fees: {
    color: '#ADD2FD',
  },
  bottomtext1: {
    color: '#ADD2FD',
    marginTop: 15,
    textAlign: 'center',
  },
});

export default BottomSheetTrade;
