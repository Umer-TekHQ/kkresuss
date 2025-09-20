import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {
  HandlerStateChangeEvent,
  PanGestureHandler,
  GestureHandlerRootView,
  PanGestureHandlerEventPayload,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  withSpring,
  useSharedValue as useReanimatedSharedValue,
  runOnJS,
} from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

import { storage } from '../../api/axiosInstance';
import { walletApi } from '../../api/walletApi';
import { Images } from '../../assets';
import BottomSheetProfile from '../../components/BottomSheetProfile';
import ProfileCard from '../../components/ProfileCards';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { setProfilePicture } from '../../store/slices/userSlice';
import { Colors } from '../../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ProfileScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const { username, profilePicture } = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();

  const displayName = username || 'Nate Morey';
  const displayUsername = username ? `${username.toLowerCase()}.kresus` : 'natemorey802.kresus';

  const handleChangeProfilePicture = () => {
    const newPicture =
      profilePicture === Images.profileIcon ? Images.profileIcon : Images.profileIcon;
    dispatch(setProfilePicture(newPicture));
  };

  const [wallets, setWallets] = useState<any[]>([]);

  useEffect(() => {
    const fetchWallets = async () => {
      try {
        const token = storage.getString('token');
        if (!token) {
          Toast.show({ type: 'error', text1: 'Session expired. Please log in again.' });
          return;
        }

        const walletResponse = await walletApi.getUserWallets();

        const raw = Array.isArray(walletResponse?.WalletsData)
          ? walletResponse.WalletsData
          : Array.isArray(walletResponse)
          ? walletResponse
          : Array.isArray(walletResponse?.wallets)
          ? walletResponse.wallets
          : [];

        const first = raw[0] || {};

        const formatAddress = (addr?: string) => {
          if (!addr || addr.length <= 10) return addr || '';
          return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
        };

        const cards: any[] = [];

        if (first.solana) {
          cards.push({
            icon: Images.solanaLogo,
            title: 'Solana Wallet Address',
            address: formatAddress(first.solana),
            copyValue: first.solana,
            background: Images.solanaBg,
          });
        }

        if (first.base) {
          cards.push({
            icon: Images.baseCardLogo,
            title: 'Base Wallet Address',
            address: formatAddress(first.base),
            copyValue: first.base,
            background: Images.baseBg,
          });
        }

        if (first.world) {
          cards.push({
            icon: Images.baseCardLogo,
            title: 'World Wallet Address',
            address: formatAddress(first.world),
            copyValue: first.world,
            background: Images.baseBg,
          });
        }

        setWallets(cards);
      } catch (error) {
        console.log('Wallet API Error', error);
        const message = (error as any)?.message || 'Unable to load wallets';
        Toast.show({ type: 'error', text1: message });
      }
    };

    fetchWallets();
  }, []);

  const CardDeck = () => {
    const topCardIndex = useReanimatedSharedValue(0);
    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

    const handleSwipe = () => {
      topCardIndex.value = topCardIndex.value === 0 ? 1 : 0;
    };

    const handleCardPress = (card: typeof wallets[0]) => {
      if (card.title.includes('Base')) {
        navigation.navigate('baseReceiveScreen', { card });
      } else if (card.title.includes('Solana')) {
        navigation.navigate('CardReceiveScreen', { card });
      } else {
        Toast.show({ type: 'info', text1: 'Screen not available for this wallet' });
      }
    };

    if (wallets.length === 0) return null;

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
      <GestureHandlerRootView>
        <PanGestureHandler
          onHandlerStateChange={(
            event: HandlerStateChangeEvent<PanGestureHandlerEventPayload>,
          ) => {
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
              }, [topCardIndex]);

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
      </GestureHandlerRootView>
    );
  };

  const AVATAR_SIZE = screenWidth * 0.19;
  const ICON_SIZE = screenWidth * 0.08;
  const NAME_FONT = screenWidth * 0.048;
  const USERNAME_FONT = screenWidth * 0.04;
  const UPGRADE_FONT = screenWidth * 0.037;
  const CARDS_MARGIN_TOP = screenHeight * 0.19;

  return (
    <View style={{ flex: 1, backgroundColor: '#000' }}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={Images.backButton}
              style={[styles.icon, { width: ICON_SIZE, height: ICON_SIZE }]}
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={[styles.editText, { fontSize: USERNAME_FONT }]}>Edit</Text>
          </TouchableOpacity>
        </View>

        {/* Profile */}
        <View style={styles.profileSection}>
          <TouchableOpacity onPress={handleChangeProfilePicture}>
            <Image
              source={profilePicture || Images.profileIcon}
              style={[
                styles.avatar,
                { width: AVATAR_SIZE, height: AVATAR_SIZE, borderRadius: AVATAR_SIZE / 2 },
              ]}
            />
          </TouchableOpacity>
          <Text style={[styles.name, { fontSize: NAME_FONT }]}>{displayName}</Text>
          <Text style={[styles.username, { fontSize: USERNAME_FONT }]}>{displayUsername}</Text>
          <TouchableOpacity>
            <Text style={[styles.upgrade, { fontSize: UPGRADE_FONT }]}>
              Upgrade ID {'>'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* Wallet Cards */}
        <View style={{ marginTop: CARDS_MARGIN_TOP }}>
          <CardDeck />
        </View>
      </ScrollView>

      {/* Bottom Sheet */}
      <BottomSheetProfile navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
    position: 'relative',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 15,
  },
  icon: {},
  editText: {
    color: Colors.white,
    marginTop: 5,
  },
  profileSection: {
    alignItems: 'center',
  },
  avatar: {},
  name: {
    color: Colors.white,
    marginTop: 12,
  },
  username: {
    color: Colors.lightblue,
    marginTop: 4,
  },
  upgrade: {
    color: Colors.gold,
    marginTop: 4,
  },
});

export default ProfileScreen;

