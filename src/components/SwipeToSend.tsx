import React, { useRef,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  PanResponder,
  ImageBackground,
  Image
} from 'react-native';
import { Images } from '../assets'; 
import { useIsFocused } from '@react-navigation/native';

const { width } = Dimensions.get('window');
const SWIPE_WIDTH = width - 40;
const SWIPE_LIMIT = SWIPE_WIDTH - 60;

interface SwipeToSendProps {
  placeholder?: string;
  onNavigate?: () => void;
}

const SwipeToSend: React.FC<SwipeToSendProps> = ({ placeholder = 'Swipe to Send', onNavigate }) => {
  const panX = useRef(new Animated.Value(0)).current;
  const bgColor = useRef(new Animated.Value(0)).current;
    const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      panX.setValue(0);
      bgColor.setValue(0);
    }
  }, [isFocused]);



  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (_, gesture) => {
        let newX = Math.min(Math.max(0, gesture.dx), SWIPE_LIMIT);
        panX.setValue(newX);
        bgColor.setValue(newX / SWIPE_LIMIT);
      },
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_LIMIT * 0.95) {
          if (onNavigate) onNavigate();
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
    inputRange: [0, 1],
    outputRange: ['#01032C', '#FF8C00'],
  });

  return (
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
          <Image source={Images.arrowforward} style={styles.arrowIcon} resizeMode="contain" />
        </Animated.View>

        <Text style={styles.swipeText}>{placeholder}</Text>
      </Animated.View>
    </ImageBackground>
  );
};

export default SwipeToSend;

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: 126,
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeContainer: {
    width: SWIPE_WIDTH,
    height: 59,
    borderRadius: 99,
    bottom:8,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  whiteCircle: {
    width: 55,
    height: 55,
    borderRadius: 99,
    backgroundColor: '#fff',
    position: 'absolute',
    left: 2,
    zIndex: 1,
     justifyContent: 'center', 
    alignItems: 'center',  
  },
  swipeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  arrowIcon: {
  width: 24,
  height: 24,
  tintColor: '#000', 
  alignSelf: 'center',
},
});
