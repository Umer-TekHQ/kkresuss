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
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'




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

  const backBtnWidth = 30; // back icon area + gap
  const textWidth = 160; 
  const startX = -15; // extreme left ke liye (back button ke right se start karega)
  const endX = (SCREEN_WIDTH / 2) - (textWidth / 2) - backBtnWidth / 2;

  return {
    fontSize: interpolate(progress, [0, 1], [30, 19]),
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
   <Animated.View style={[styles.headerRow]}>
  <Animated.View style={[styles.backBtnContainer, backButtonStyle]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={Images.backscreen} style={styles.backIcon} />
    </TouchableOpacity>
  </Animated.View>

  <Animated.Text style={[styles.heading, headingStyle]}>
    Today's Return
  </Animated.Text>

  <View style={{ width: 20 }} />
</Animated.View>

        <Text style={styles.description}>
          Today’s return refers to the percentage change in the value of a crypto investment from the
          beginning of the day to the current time. It measures the gain or loss on the investment
          within a single trading day, reflecting the token’s price fluctuations over that period.
          This metric helps investors quickly assess the day’s performance of their crypto holdings.
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
    backgroundColor: '#01021D',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    borderRadius: 15,
    
  },
  line: {
    width: 55,
    height: 4,
    backgroundColor: '#10132C',
    alignSelf: 'center',
    marginVertical: 15,
    borderRadius: 2,
  },
  heading: {
    color: '#ffffff',
    fontWeight: '600',
   // marginVertical: 10,
   fontSize:30,
  },
  description: {
    color: '#ADD2FD',
    marginHorizontal: 20,
    marginTop: 25,
    fontSize: 20,
  },
  backBtnContainer: {
    // position: 'absolute',
    // left: 15,
    // top: 18,
    // zIndex: 10,
     width: 20,
  },
  backIcon: {
    width: 30,
    height: 30,
    tintColor: 'white',
  },
  headerRow: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-start',
  marginHorizontal: 15,
  marginTop: -20, 
},
});
