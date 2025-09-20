import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  Image,
} from 'react-native';
import { heightPercentageToDP as hp} from 'react-native-responsive-screen';

import { Images } from '../assets'; 
import { AppNavigatorParamList, routeNames } from '../navigators/routeNames';
import { useAppDispatch} from '../store/hooks';
import { resetTrade } from '../store/slices/tradeSlice';


const { width } = Dimensions.get('window');
const SWIPE_WIDTH = width - 40;
const SWIPE_LIMIT = SWIPE_WIDTH - 60;

interface SwipeButton {
  placeholder?: string;
  onNavigate?: () => void;
}

const SwipeButton: React.FC<SwipeButton> = ({ placeholder = 'Swipe to Send', onNavigate }) => {
  const panX = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
  const [isCompleted, setIsCompleted] = useState(false);
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const dispatch = useAppDispatch();

  const handleTradeComplete = () => {
    setIsCompleted(true);
        
    setTimeout(() => {
      navigation.navigate(routeNames.TradeStatusScreen);
      
      setTimeout(() => {
        dispatch(resetTrade());
      }, 100);
    }, 500);
    
    if (onNavigate) {
      onNavigate();
    }
  };

  const textOpacity = panX.interpolate({
  inputRange: [0, SWIPE_LIMIT * 0.5, SWIPE_LIMIT],
  outputRange: [1, 0.3, 0],
  extrapolate: 'clamp',
});


  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isCompleted,
      onPanResponderMove: (_, gesture) => {
        if (isCompleted) return;
        const newX = Math.min(Math.max(0, gesture.dx), SWIPE_LIMIT);
        panX.setValue(newX);
        bgColor.setValue(newX / SWIPE_LIMIT);
      },
      onPanResponderRelease: (_, gesture) => {
        if (isCompleted) return;
        
        if (gesture.dx > SWIPE_LIMIT * 0.95) {
          Animated.spring(panX, {
            toValue: SWIPE_LIMIT,
            useNativeDriver: false,
          }).start();
          
          Animated.timing(bgColor, {
            toValue: 2, 
            duration: 300,
            useNativeDriver: false,
          }).start();
          
          setTimeout(handleTradeComplete, 500);
        } else {
          Animated.spring(panX, {
            toValue: 0,
            useNativeDriver: false,
          }).start();
          bgColor.setValue(0);
        }
      },
    })
  ).current;

  const interpolatedBg = bgColor.interpolate({
    inputRange: [0, 1, 2],
    outputRange: ['#08032C', '#08032C', '#08032C'], 
  });

  return(
    <ImageBackground
      source={Images.waves}
      style={styles.background}
      resizeMode="cover"
    >
      <Animated.View style={[styles.swipeContainer, { backgroundColor: interpolatedBg }]}>
        <Animated.View
          {...panResponder.panHandlers}
          style={[styles.whiteCircle, { transform: [{ translateX: panX }] }]}
        >
          <Image
            source={Images.swipeArrow}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </Animated.View>
        <Animated.Text style={[styles.swipeText, { opacity: textOpacity }]}>
          {isCompleted ? "Trade Completed!" : placeholder}
        </Animated.Text>

      </Animated.View>
    </ImageBackground>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 120,
    alignItems: 'center',
    bottom: 0
  },
  swipeContainer: {
    width: SWIPE_WIDTH,
    height: hp('7.8%'),
    borderRadius: 99,
    justifyContent: 'center',
    marginTop: hp('2%'),
    overflow: 'hidden',
    position: 'relative',
  },
  whiteCircle: {
    width: 55,
    height: 55,
    borderRadius: 99,
    backgroundColor: '#fff',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    left: 4,
    zIndex: 1,
  },
  swipeText: {
    color: '#D4EBFF',
    fontSize: 18,
    alignSelf: 'center',
    letterSpacing: 0.5,
  },
  arrowIcon: {
  width: 26,
  height: 26,
  tintColor: '#08032C', 
},
});
