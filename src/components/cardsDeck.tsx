import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import {
  View,
  TouchableOpacity,
  Dimensions,
  StyleSheet
} from 'react-native';
import {
  PanGestureHandler,
  GestureHandlerRootView,
  HandlerStateChangeEvent,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import ProfileCard from './ProfileCards';
import { AppNavigatorParamList } from '../navigators/routeNames';

const { height: screenHeight } = Dimensions.get('window');

interface WalletCard {
  icon: any;
  title: string;
  address: string;
  copyValue: string;
  background: any;
}

interface CardDeckProps {
  wallets: WalletCard[];
}

const CardDeck: React.FC<CardDeckProps> = ({ wallets }) => {
  const topCardIndex = useSharedValue(0); 
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const handleSwipe = () => {
    topCardIndex.value = topCardIndex.value === 0 ? 1 : 0;
  };

  const handleCardPress = (card: WalletCard) => {
    if (card.title.includes('Base')) {
      navigation.navigate('baseReceiveScreen', { card });
    } else if (card.title.includes('Solana')) {
      navigation.navigate('CardReceiveScreen', { card });
    } else {
      Toast.show({ type: 'info', text1: 'Screen not available for this wallet' });
    }
  };

  const renderCards = () => {
    if (wallets.length === 0) {
      return null;
    }

    if (wallets.length === 1) {
      return (
        <View style={{ height: screenHeight * 0.3, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.9} onPress={() => handleCardPress(wallets[0])}>
            <ProfileCard {...wallets[0]} />
          </TouchableOpacity>
        </View>
      );
    }

    return (
      <PanGestureHandler
        onHandlerStateChange={(event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>) => {
          const translationY = event.nativeEvent.translationY;
          if (Math.abs(translationY) > 50) {
            runOnJS(handleSwipe)();
          }
        }}
      >
        <View style={{ height: screenHeight * 0.3, justifyContent: 'center', alignItems: 'center' }}>
          {[1, 0].map((i) => {
            const animatedStyle = useAnimatedStyle(() => {
              const isTop = topCardIndex.value === i;
              return {
                position: 'absolute',
                zIndex: isTop ? 2 : 1,
                transform: [
                  { translateY: withSpring(isTop ? 0 : -75) },
                  { scale: withSpring(0.97) },
                ],
                opacity: withSpring(1),
              };
            });

            return (
              <Animated.View key={i} style={animatedStyle}>
                <TouchableOpacity activeOpacity={0.9} onPress={() => handleCardPress(wallets[i])}>
                  <ProfileCard {...wallets[i]} />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </PanGestureHandler>
    );
  };

  return <GestureHandlerRootView>{renderCards()}</GestureHandlerRootView>;
};

export default CardDeck;


const styles = StyleSheet.create({
    profileCardView:{
        height: screenHeight * 0.3, 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    cardSwapView:{
        height: screenHeight * 0.3, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }
})