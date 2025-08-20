import React, { useRef, useState } from 'react';
import {
  StyleSheet,
  Text,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  Image,
} from 'react-native';
import { Images } from '../assets'; 
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList, routeNames } from '../navigators/routeNames';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { resetTrade } from '../store/slices/tradeSlice';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

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
  const tradeState = useAppSelector(state => state.trade);

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

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isCompleted,
      onPanResponderMove: (_, gesture) => {
        if (isCompleted) return;
        let newX = Math.min(Math.max(0, gesture.dx), SWIPE_LIMIT);
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
    outputRange: ['#08032C', '#1d658dff', '#2ED459'], 
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
            source={Images.swipearrow}
            style={styles.arrowIcon}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.swipeText}>
          {isCompleted ? "Trade Completed!" : placeholder}
        </Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default SwipeButton;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 126,
    alignItems: 'center',
    bottom: 0
  },
  swipeContainer: {
    width: SWIPE_WIDTH,
    height: hp('8%'),
    borderRadius: 99,
    justifyContent: 'center',
    marginTop: hp('1.2%'),
    overflow: 'hidden',
    position: 'relative',
  },
  whiteCircle: {
    width: 50,
    height: 50,
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
