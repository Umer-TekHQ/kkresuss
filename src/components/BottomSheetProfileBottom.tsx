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
import { Colors } from '../theme/colors';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

export interface TodaysReturnRef {
  openSheet: () => void;
  closeSheet: () => void;
}
interface Props {}
const TodaysReturnComponent =forwardRef<TodaysReturnRef, Props>((props, ref) => {
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
  const textWidth = SCREEN_WIDTH * 0.45; 
  const startX = SCREEN_WIDTH * 0.09;   
  const endX =
    (SCREEN_WIDTH / 2) - textWidth / 1.8 - backBtnWidth / 2; 

  return {
    transform: [
      {
        translateX: interpolate(progress, [0, 1], [startX, endX]),
      },
      {
        scale: interpolate(progress, [0, 1], [1.6, 1]), 
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
    Supported Networks
  </Animated.Text>

    <View style={styles.separator} />
    </Animated.View>

        <Text style={styles.description}>
            Kresus wallet is designed specifically for seamless transactions with tokens
            and NFTs on the Base network, as well as tokens on the Solana networks. It's
            crucial to ensure that you are sending and receiving assets exclusively on
            these networks, as transactions on other networks like Ethereum MainNet can
            lead to the permanent loss of your assets.
        </Text>
        <Text style={styles.heading2}>Double Check</Text>
        <Text style={styles.description}>
           Always double-check the networks compatibility before making a transfer to protect your valuable tokens and NFTs. If you have any questions or need assistance, our support team is here to help.        
        </Text>
      </Animated.View>
    </GestureDetector>
  );
});

export default TodaysReturnComponent;

const styles = StyleSheet.create({
  container: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    backgroundColor: Colors.backgroundAlt,
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 15,
    borderColor: Colors.background4,
    borderTopWidth: 1.5,
    borderLeftWidth: 0.5,
    borderRightWidth: 0.5,
  },
  separator:{
    width: 20
  },
  line: {
    width: 55,
    height: 4,
    backgroundColor: Colors.background4,
    alignSelf: 'center',
    marginVertical: 10,
    borderRadius: 2,
  },
heading: {
  color: Colors.white,
  fontWeight: '600',
  fontSize: 18, // ✅ keep smaller base size
  fontFamily: 'PlayfairDisplay-Bold',
  marginTop: 20,
},

  description: {
    color: Colors.lightblue,
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
    tintColor: Colors.white,
    marginTop: 20,
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginHorizontal: 15,
  marginTop: -20, 
},
heading2:{
  marginTop: 60,
  marginLeft: 20,
  fontWeight: '700',
  fontSize: 15,
  color: Colors.white,
},
});
