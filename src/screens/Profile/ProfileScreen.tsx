import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import ProfileCard from '../../components/ProfileCards';
import { Images } from '../../assets';
import { BottomSheetUnified } from '../../components/BottomSheet';
import { useSharedValue } from 'react-native-reanimated';
import { BottomSheetColors } from '../../theme/theme';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProfilePicture } from '../../store/slices/userSlice';
import { RootState } from '../../store';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue as useReanimatedSharedValue,
  runOnJS,
  useAnimatedGestureHandler,
} from 'react-native-reanimated';
import { HandlerStateChangeEvent, PanGestureHandler, GestureHandlerRootView, PanGestureHandlerEventPayload, PanGestureHandlerGestureEvent } from 'react-native-gesture-handler';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const translateY = useSharedValue(0);

  const { username, profilePicture } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const displayName = username || 'Nate Morey';
  const displayUsername = username ? `${username.toLowerCase()}.kresus` : 'natemorey802.kresus';

  const handleChangeProfilePicture = () => {
    const newPicture = profilePicture === Images.profileicon ? Images.profileicon : Images.profileicon;
    dispatch(setProfilePicture(newPicture));
  };

  const initialCards = [
    {
      icon: Images.solanalogo,
      title: 'Solana Wallet Address',
      address: 'dDCQNn...c7c8',
      background: Images.solanabg,
    },
    {
      icon: Images.basecardlogo,
      title: 'Base Wallet Address',
      address: 'dDCQNn...c7c8',
      background: Images.basebg, 
      backgroundColor: '#000', 
    },
  ];

  const reorderedCards = useReanimatedSharedValue(initialCards);

  const swapCards = () => {
    reorderedCards.value = [...reorderedCards.value].reverse();
  };

const CardDeck = () => {
  const topCardIndex = useReanimatedSharedValue(0);
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const handleSwipe = () => {
    topCardIndex.value = topCardIndex.value === 0 ? 1 : 0;
  };

  const handleCardPress = (card: typeof initialCards[0]) => {
    navigation.navigate('CardReceiveScreen', { card });
  };

  return (
    <GestureHandlerRootView>
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
                  { translateY: withSpring(isTop ? 0 : -65) },
                  { scale: withSpring(isTop ? 1 : 0.98) },
                ],
                opacity: withSpring(isTop ? 1 : 0.85),
              };
            }, [topCardIndex]);

            return (
              <Animated.View key={i} style={animatedStyle}>
                <TouchableOpacity
                  activeOpacity={0.9}
                  onPress={() => handleCardPress(initialCards[i])}
                >
                  <ProfileCard {...initialCards[i]} />
                </TouchableOpacity>
              </Animated.View>
            );
          })}
        </View>
      </PanGestureHandler>
    </GestureHandlerRootView>
  );
};


  const AVATAR_SIZE = screenWidth * 0.19;
  const ICON_SIZE = screenWidth * 0.09;
  const NAME_FONT = screenWidth * 0.048;
  const USERNAME_FONT = screenWidth * 0.04;
  const UPGRADE_FONT = screenWidth * 0.037;
  const HEADER_MARGIN = screenWidth * 0.025;
  const CARDS_MARGIN_TOP = screenHeight * 0.19;

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={Images.backarrow}
            style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE, marginTop: HEADER_MARGIN, marginLeft: HEADER_MARGIN }]}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.editText, { fontSize: USERNAME_FONT }]}>Edit</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <TouchableOpacity onPress={handleChangeProfilePicture}>
          <Image
            source={profilePicture || Images.profileicon}
            style={[styles.avatar, { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 }]}
          />
        </TouchableOpacity>
        <Text style={[styles.name, { fontSize: NAME_FONT }]}>{displayName}</Text>
        <Text style={[styles.username, { fontSize: USERNAME_FONT }]}>{displayUsername}</Text>
        <TouchableOpacity>
          <Text style={[styles.upgrade, { fontSize: UPGRADE_FONT }]}>Upgrade ID {'>'}</Text>
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: CARDS_MARGIN_TOP }}>
        <CardDeck />
      </View>

      <BottomSheetUnified screen="profile" translateY={translateY} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,
    paddingHorizontal: Math.max(10, screenWidth * 0.02), // Responsive horizontal padding
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    width: 20,
    height: 20,
  },
  editText: {
    color: '#fff',
    marginRight: 10,
    marginTop: 15,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {},
  name: {
    color: 'white',
    marginTop: 12,
  },
  username: {
    color: '#ADD2FD',
    marginTop: 4,
  },
  upgrade: {
    color: '#CEB55A',
    marginTop: 4,
  },
});

export default ProfileScreen;
