import React, { useImperativeHandle, useEffect, useState, forwardRef } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolate,
  useAnimatedReaction,
  runOnJS,
} from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import SwipeButton from './SwipeButton';
import { Images } from '../assets';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../theme/colors';

export interface BottomSheetTradeRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const TRANSLATE_Y_CONFIG = {
  initial: -hp('3%'),
  min: -hp('1%'),
  max: -hp('75.07%'),
};
interface BottomSheetTradeProps {
  onClose?: () => void; 
}

const BottomSheetTrade = forwardRef<BottomSheetTradeRef, BottomSheetTradeProps>((props, ref) => {
  const { onClose } = props;
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
  translateY.value = withSpring(initialY.value, { damping: 15, stiffness: 80, mass: 0.8 });
  setBlockingPointerEvents(false);

  if (onClose) runOnJS(onClose)(); 
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
          styles.container,
          overlayStyle,
        ]}
      />

      <GestureDetector gesture={gesture}>
        <Animated.View style={[styles.tradeBottomSheet, rStyle]}>
          <View style={styles.lineTB} />
          <View style={styles.head}>
            <Image
              source={Images.tradeBottom}
              style={
                styles.headImg}
            />
            <Text style={styles.headingTB}>
              Transaction Ready
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={closeSheet}>
              <Image
                source={Images.pros}
                style={
                  styles.closeIcon}
              />
            </TouchableOpacity>
          </View>

          {token1 && token2 && (
            <>
              <View style={styles.inputFields}>
                <View
                  style={
                    styles.tokenInputContainer}
                >
                  <Text
                    style={
                      styles.labelText}
                  >
                    TRADING
                  </Text>
                  <View style={styles.tokenDisplay}>
                    <View style={styles.amountSymbolView}>
                      <Text
                        style={
                          styles.tradeAmount}
                      >
                        {amount1}
                      </Text>
                      <Text
                        style={
                          styles.tokenSymbol}
                      >
                        {token1.abbreviation}
                      </Text>
                    </View>
                    <Image
                      source={token1.logo}
                      style={styles.tokenLogo}
                    />
                  </View>
                </View>

                <View style={styles.arrowContainer}>
                  <Image
                    source={Images.downArroww}
                    style={styles.downArrow}
                  />
                </View>

                <View
                  style={
                    styles.tokenInputContainer}
                >
                  <Text
                    style={
                      styles.labelText}
                  >
                    FOR
                  </Text>
                  <View style={styles.tokenDisplay}>
                    <View style={styles.amountSymbolView}>
                      <Text
                        style={
                          styles.tradeAmount}
                      >
                        {amount2}
                      </Text>
                      <Text
                        style={
                          styles.tokenSymbol}
                      >
                        {token2.abbreviation}
                      </Text>
                    </View>
                    <Image
                      source={token2.logo}
                      style={styles.tokenLogo}
                    />
                  </View>
                </View>
              </View>

              <View
                style={
                  styles.feesContainer}
              >
                <Text style={styles.fees}>Fees</Text>
                <Text style={styles.fees}>1.73144653 SNORT</Text>
              </View>

              <Text
                style={styles.bottomText1}>
                Kresus covers your network fee
              </Text>

              <View style={styles.swipeButtonView}>
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
  container:{
    backgroundColor: Colors.backgroundNetwork,
  },
  tradeBottomSheet: {
    borderRadius: 35,
    borderTopWidth: 1,
    borderRightWidth: 2,
    borderLeftWidth: 2,
    borderTopColor: Colors.background1,
    height: hp('100%'),
    width: wp('100%'),
    backgroundColor: Colors.background,
    position: 'absolute',
    top: hp('100%'),
    paddingTop: hp('1%') 
  },
  swipeButtonView:{
    marginTop: hp('2.5%')
  },
  amountSymbolView:{
    flexDirection: 'column', 
    alignItems: 'flex-end'
  },
  lineTB: {
    marginLeft: 4,
    backgroundColor: Colors.background4,
    alignSelf: 'center',
    marginHorizontal: 8,
    borderRadius: 2,
    width: wp('15%'), 
    height: hp('0.5%'), 
    marginTop: hp('1%')
  },
  head: {
    flexDirection: 'row',
    marginTop: 5,
    textAlign: 'center',
    alignItems: 'center',
    marginBottom: hp('1.5%')
  },
  headImg: {
    padding: 12,
    width: wp('3.5%'), 
    height: hp('2%'), 
    marginLeft: wp('5%'), 
    marginTop: hp('1%')
  },
  headingTB: {
    color: Colors.transaction,
    marginTop: 6,
    fontSize: wp('4.5%'), 
    marginLeft: wp('4%')
  },
  closeButton: {
    position: 'absolute',
    right: 3,
    top: 0,
    padding: 5,
  },
  closeIcon: {
    tintColor: Colors.lightblue,
    width: wp('6%'), 
    height: hp('5%'), 
    marginRight: wp('3%')
  },
  inputFields: {
    alignItems: 'center',
  },
  tokenInputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: Colors.blue,
    paddingHorizontal: 10,
    width: wp('90%'), 
    height: hp('8%'), 
    marginVertical: hp('1%')
  },
  labelText: {
    letterSpacing: 0.5,
    fontSize: wp('3.5%'), 
    color: Colors.lightblue, 
    marginBottom: hp('0.5%'),
  },
  tokenDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tradeAmount: {
    color: Colors.white,
    marginRight: 10,
    fontSize: wp('5%'), 
    textAlign: 'right'
  },
  tokenLogo: {
    width: wp('10%'), 
    height: wp('10%'),
    borderRadius: 15,
    marginRight: 8,
  },
  tokenSymbol: {
    color: Colors.white,
    letterSpacing: 0.5,
    fontSize: wp('4%'), 
    marginTop: hp('0.2%'), 
    marginRight: wp('2.5%')
  },
  arrowContainer: {
    alignItems: 'center',
    marginVertical: 10,
  },
  downArrow: {
     marginLeft: 15,
     width: wp('4%'), 
     height: hp('3%') 
  },
  feesContainer: {
    flexDirection: 'row',
    marginTop: 20,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: Colors.back,
    justifyContent: 'space-between',
    marginHorizontal: wp('5%'), paddingVertical: hp('1%')
  },
  fees: {
    color: Colors.lightblue,
    fontSize: wp('3.5%')
  },
  bottomText1: {
    color: Colors.lightblue,
    textAlign: 'center',
    fontSize: wp('3.5%'), 
    marginTop: hp('3%'), 
    marginBottom: hp('4.5%')
  },
});

export default BottomSheetTrade;
