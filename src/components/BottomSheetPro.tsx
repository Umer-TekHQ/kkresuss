import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { forwardRef, useImperativeHandle } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  Extrapolation ,
} from 'react-native-reanimated';

import { Images } from '../assets';
import { AppNavigatorParamList } from '../navigators/routeNames'

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export interface TodaysReturnRef {
  openSheet: () => void;
  closeSheet: () => void;
}
interface Props {}
const BottomSheetPro =forwardRef<TodaysReturnRef, Props>((props, ref) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const translateY = useSharedValue(-SCREEN_HEIGHT / 1.8);
  const context = useSharedValue({ y: 0 });
  const minY = -SCREEN_HEIGHT / 1.8; 
  const maxY = -SCREEN_HEIGHT; 
  const openSheet = () => {
    'worklet';
    translateY.value = withSpring(maxY, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
  };
  const closeSheet = () => {
    'worklet';
    translateY.value = withSpring(minY, {
      damping: 15,
      stiffness: 80,
      mass: 0.8,
    });
  };
  useImperativeHandle(ref, () => ({
    openSheet,
    closeSheet,
  }));

  const gesture = Gesture.Pan()
    .onStart(() => {
      context.value = { y: translateY.value };
    })
    .onUpdate((event) => {
      translateY.value = Math.max(Math.min(event.translationY + context.value.y, minY), maxY);
    })
    .onEnd((event) => {
      const midpoint = (minY + maxY) / 2;
      if (event.velocityY < -500 || translateY.value < midpoint) {
        openSheet();
      } else {
        closeSheet();
      }
    });

    const lineStyle = useAnimatedStyle(() => {
  const opacity = interpolate(
    translateY.value,
    [minY, maxY],
    [1, 0], 
    Extrapolation.CLAMP
  );
  return { opacity };
});

const headingStyle = useAnimatedStyle(() => {
  const progress = interpolate(
    translateY.value,
    [minY, maxY],
    [0, 1],
    Extrapolation.CLAMP
  );

  const backBtnWidth = 30; 
  const textWidth = 160; 
  const startX = -15;
  const endX = (SCREEN_WIDTH / 2) - (textWidth / 1.2) - backBtnWidth / 2;

  return {
    fontSize: interpolate(progress, [0, 1], [28, 18]),
    transform: [
      {
        translateX: interpolate(progress, [0, 1], [startX, endX]),
      },
    ],
  };
});  
  const backButtonStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [minY, maxY],
      [0, 1],
      Extrapolation.CLAMP
    );
    return { opacity };
  });

  const rStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <GestureDetector gesture={gesture}>
      <Animated.View style={[styles.container, rStyle]}>
      
<Animated.View style={[styles.line, lineStyle]} />
   <Animated.View style={styles.headerRow}>
  <Animated.View style={[styles.backBtnContainer, backButtonStyle]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={Images.backScreen} style={styles.backIcon} />
    </TouchableOpacity>
  </Animated.View>

  <Animated.Text style={[styles.heading, headingStyle]}>
    See What the Pros are Buying
  </Animated.Text>

    <View style={{ width: 20 }} />
    </Animated.View>

        <Text style={styles.description}>
           Sourced from on-chain data, 'Top Buys' reveals which coins historically profitable
           traders are buying right now, to help you find potentially winning trades ahead of
           the rest. Please conduct your own research before making any trades.
        </Text>
      </Animated.View>
    </GestureDetector>
  );
});

export default BottomSheetPro;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: '#01032C',
    borderColor: '#10178A',
    borderTopWidth: 1.5,
    borderLeftWidth:0.5,
    borderRightWidth:0.5,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 15,
  },
  line: {
    width: 55,
    height: 4,
    backgroundColor: '#030A74',
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
  heading: {
    color: '#ffffff',
    fontFamily: 'PlayfairDisplay-Bold',
    fontSize:30,
    marginTop: 20,
  },
  description: {
    color: '#ADD2FD',
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 20,
  },
  backBtnContainer: {
     width: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
    marginTop: 22,
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginHorizontal: 15,
  marginTop: -20, 
},
});
