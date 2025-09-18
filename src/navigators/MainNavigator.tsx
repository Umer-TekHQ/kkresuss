import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { BottomNavigator } from './BottomNavigator';
import { BottomSheetScreen } from '../screens';
import AssetsScreen from '../screens/Assets/AssetsScreen';
import SpamScreen from '../screens/Assets/SpamScreen';
import SupportedScreen from '../screens/Assets/SupportedScreen';
import BaseReceiveScreen from '../screens/Profile/baseReceiveScreen';
import CardReceiveScreen from '../screens/Profile/CardReceiveScreen';
import { ProfileBottom } from '../screens/Profile/ProfileBottomSheet';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { ProsScreen } from '../screens/Pros/ProsScreen';
import ReviewSend from '../screens/Send/ReviewSend';
import SelectCurrency from '../screens/Send/SelectCurrency';
import SelectQR from '../screens/Send/SelectQR';
import SelectRecipient from '../screens/Send/SelectRecipient';
import SendDetails from '../screens/Send/SendDetails';
import TransactionStatus from '../screens/Send/TransactionStatus';
import AdvancedVerificationInfoScreen from '../screens/Settings/AdvancedVerificationInfoScreen';
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicyScreen';
import RecoveryAnd2FAScreen from '../screens/Settings/RecoveryAnd2FAScreen';
import SecurityScreen from '../screens/Settings/SecurityScreen';
import SettingScreen from '../screens/Settings/SettingScreen';
import AssetDetailScreen from '../screens/TokenDetails/AssetDetailScreen';
import TodaysReturnScreen from '../screens/TokenDetails/TodaysReturnScreen';
import ReceiveTokenScreen from '../screens/Trade/ReceiveSearchScreen';
import SearchScreen from '../screens/Trade/SearchScreen';
import TradeStatusScreen from '../screens/Trade/TradeStatusScreen';


const MainStack = createNativeStackNavigator();

export const MainNavigator = () => (
  <MainStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right',
      animationTypeForReplace: 'push',
    }}
  >
    <MainStack.Screen name="BottomNavigator" component={BottomNavigator} />
    <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
    <MainStack.Screen name="bottomScreen" component={BottomSheetScreen} />
    <MainStack.Screen name="ProsScreen" component={ProsScreen} />
    <MainStack.Screen name="Settings" component={SettingScreen} />
    <MainStack.Screen name="Security" component={SecurityScreen} />
    <MainStack.Screen name="Recovery" component={RecoveryAnd2FAScreen} />
    <MainStack.Screen name="Privacy" component={PrivacyPolicyScreen} />
    <MainStack.Screen name="Verification" component={AdvancedVerificationInfoScreen} />
    <MainStack.Screen name="TokenDetail" component={AssetDetailScreen} />
    <MainStack.Screen name="ProfileBottom" component={ProfileBottom} />
    <MainStack.Screen name="CardReceiveScreen" component={CardReceiveScreen} />
    <MainStack.Screen name="baseReceiveScreen" component={BaseReceiveScreen} />
    <MainStack.Screen name="SearchScreen" component={SearchScreen} />
    <MainStack.Screen name="ReceiveTokenScreen" component={ReceiveTokenScreen} />
    <MainStack.Screen name="TodayReturns" component={TodaysReturnScreen} />
    <MainStack.Screen name="Supported" component={SupportedScreen} />
    <MainStack.Screen name="Spam" component={SpamScreen} />
    <MainStack.Screen name="Currency" component={SelectCurrency} />
    <MainStack.Screen name="Recipient" component={SelectRecipient} />
    <MainStack.Screen name="QR" component={SelectQR} />
    <MainStack.Screen name="SendDetails" component={SendDetails} />
    <MainStack.Screen name="Review" component={ReviewSend} />
    <MainStack.Screen name="AssetsScreen" component={AssetsScreen} />
    <MainStack.Screen name="TransactionStatus" component={TransactionStatus} />
    <MainStack.Screen name="TradeStatusScreen" component={TradeStatusScreen} />

  </MainStack.Navigator>
);
