import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { BottomNavigator } from './BottomNavigator';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import SettingScreen from '../screens/Settings/SettingScreen';
import SecurityScreen from '../screens/Settings/SecurityScreen';
import {ProsScreen} from '../screens/Pros/ProsScreen';
import RecoveryAnd2FAScreen from '../screens/Settings/RecoveryAnd2FAScreen';
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicyScreen';
import AdvancedVerificationInfoScreen from '../screens/Settings/AdvancedVerificationInfoScreen';
import AssetDetailScreen from '../screens/TokenDetails/AssetDetailScreen';
import CardRecieveScreen from '../screens/Profile/CardRecieveScreen';
import SearchScreen from '../screens/Trade/SearchScreen';
import TodaysReturnScreen from '../screens/TokenDetails/TodaysReturnScreen';
import SupportedScreen from '../screens/Assets/SupportedScreen';
import SpamScreen from '../screens/Assets/SpamScreen';
import SelectCurrency from '../screens/Send/SelectCurrency';
import SelectRecepient from '../screens/Send/SelectRecepient';
import SelectQR from '../screens/Send/SelectQR';
import SendDetails from '../screens/Send/SendDetails';
import ReviewSend from '../screens/Send/ReviewSend';
import AssetsScreen from '../screens/Assets/AssetsScreen';
import TransactionStatus from '../screens/Send/TransactionStatus';
import TradeStatusScreen from '../screens/Trade/TradeStatusScreen';
import { BottomSheetScreen } from '../screens';
import { ProfileBottom } from '../screens/Profile/ProfileBottomSheet';
import ReceiveTokenScreen from '../screens/Trade/ReceiveSearchScreen';
import BaseReceiveScreen from '../screens/Profile/baseReceiveScreen';

const MainStack = createNativeStackNavigator();

export const MainNavigator = () => (
  <MainStack.Navigator screenOptions={{ headerShown: false }}>
       <MainStack.Screen name="BottomNavigator" component={BottomNavigator} />
       <MainStack.Screen name="ProfileScreen" component={ProfileScreen} />
       <MainStack.Screen name="bottomscreen" component={BottomSheetScreen} />
       <MainStack.Screen name="ProsScreen" component={ProsScreen} />
       <MainStack.Screen name="Settings" component={SettingScreen} />
       <MainStack.Screen name="Security" component={SecurityScreen}/> 
       <MainStack.Screen name="Recovery" component={RecoveryAnd2FAScreen}/>
       <MainStack.Screen name="Privacy" component={PrivacyPolicyScreen} />
       <MainStack.Screen name="Verification" component={AdvancedVerificationInfoScreen} />
       <MainStack.Screen name="TokenDetail" component={AssetDetailScreen} />
       <MainStack.Screen name="ProfileBottom" component={ProfileBottom} />
       <MainStack.Screen name="CardRecieveScreen" component={CardRecieveScreen}/>
       <MainStack.Screen name="baseReceiveScreen" component={BaseReceiveScreen}/>
       <MainStack.Screen name="SearchScreen" component={SearchScreen}/>
       <MainStack.Screen name="ReceiveTokenScreen" component={ReceiveTokenScreen}/>
       <MainStack.Screen name="TodayReturns" component={TodaysReturnScreen} />
       <MainStack.Screen name="Supported" component={SupportedScreen} />
       <MainStack.Screen name="Spam" component={SpamScreen} />
       <MainStack.Screen name="Currency" component={SelectCurrency} />
       <MainStack.Screen name="Recepient" component={SelectRecepient} />
       <MainStack.Screen name="QR" component={SelectQR} />
       <MainStack.Screen name="SendDetails" component={SendDetails} />
       <MainStack.Screen name="Review" component={ReviewSend} />
       <MainStack.Screen name="AssetsScreen" component={AssetsScreen} />
       <MainStack.Screen name="TransactionStatus" component={TransactionStatus} />
       <MainStack.Screen name="TradeStatusScreen" component={TradeStatusScreen} />
  </MainStack.Navigator>
);
