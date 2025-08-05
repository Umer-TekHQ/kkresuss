import React from 'react'
import WelcomeScreen from '../screens/Auth/WelcomeScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
// import {SplashScreen, HomeScreen, OtpScreen, OtpSuccessScreen,UserNameScreen} from '../screens/index'
// import {SplashScreen, HomeScreen, OtpScreen, OtpSuccessScreen, ProsScreen} from '../screens/index'
import { SplashScreen } from '../screens/Splash/SplashScreen'
import { HomeScreen } from '../screens/HomeScreen/HomeScreen'
import { OtpScreen } from '../screens/Auth/OtpScreen'
import { OtpSuccessScreen } from '../screens/Auth/OtpSuccessScreen'
import { BottomSheetScreen, ProsScreen } from '../screens'
// import { ProsScreen } from '../screens/Pros/ProsScreen'
import { UserNameScreen } from '../screens'
import {BottomNavigator} from './BottomNavigator'
import { routeNames, AppNavigatorParamList } from './routeNames'
import { defaultScreenOptions } from './screenOptions'
import { ProfileScreen } from '../screens/Profile/ProfileScreen'
import SettingScreen from '../screens/Settings/SettingScreen'
import SecurityScreen from '../screens/Settings/SecurityScreen'
import RecoveryAnd2FAScreen from '../screens/Settings/RecoveryAnd2FAScreen'
import PrivacyPolicyScreen from '../screens/Settings/PrivacyPolicyScreen'
import AdvancedVerificationInfoScreen from '../screens/Settings/AdvancedVerificationInfoScreen'
import AssetDetailScreen from '../screens/TokenDetails/AssetDetailScreen'
import { ProfileBottom } from '../screens/Profile/ProfileBottomSheet'
import SplashScreenStyles from '../styles/SplashScreen.styles';
import CardRecieveScreen from '../screens/Profile/CardRecieveScreen'
import SearchScreen from '../screens/Trade/SearchScreen'
import ReceiveTokenScreen from '../screens/Trade/ReceiveSearchScreen'
import TodaysReturnScreen from '../screens/TokenDetails/TodaysReturnScreen'
import SupportedScreen from '../screens/Assets/SupportedScreen'
import SpamScreen from '../screens/Assets/SpamScreen'
import SelectCurrency from '../screens/Send/SelectCurrency'
import SelectRecepient from '../screens/Send/SelectRecepient'
import SelectQR from '../screens/Send/SelectQR'
import SendDetails from '../screens/Send/SendDetails'
import ReviewSend from '../screens/Send/ReviewSend'
import TransactionStatus from '../screens/Send/TransactionStatus'
import AssetsScreen from '../screens/Assets/AssetsScreen'
import TradeStatusScreen from '../screens/Trade/TradeStatusScreen'


const Stack = createNativeStackNavigator<AppNavigatorParamList>()
const RootNavigator = () => {
  return (
    <Stack.Navigator initialRouteName='Splash' screenOptions={defaultScreenOptions}>
      <Stack.Screen name= {routeNames.splash} component={SplashScreen} />
      <Stack.Screen name= {routeNames.welcome} component={WelcomeScreen} />
      <Stack.Screen name={routeNames.otp} component={OtpScreen} />
      <Stack.Screen name={routeNames.otpSuccessScreen} component={OtpSuccessScreen} />
      <Stack.Screen name={routeNames.BottomNavigator} component={BottomNavigator} />
      <Stack.Screen name={routeNames.username} component={UserNameScreen} />
      <Stack.Screen name={routeNames.bottomscreen} component={BottomSheetScreen} />
      <Stack.Screen name={routeNames.ProsScreen} component={ProsScreen} />
      <Stack.Screen name={routeNames.ProfileScreen} component={ProfileScreen} />
      <Stack.Screen name={routeNames.Settings} component={SettingScreen} />
      <Stack.Screen name={routeNames.Security} component={SecurityScreen}/> 
      <Stack.Screen name={routeNames.Recovery} component={RecoveryAnd2FAScreen}/>
      <Stack.Screen name={routeNames.Privacy} component={PrivacyPolicyScreen} />
      <Stack.Screen name={routeNames.Verification} component={AdvancedVerificationInfoScreen} />
      <Stack.Screen name={routeNames.TokenAsset} component={AssetDetailScreen} />
      <Stack.Screen name={routeNames.ProfileBottom} component={ProfileBottom} />
      <Stack.Screen name={routeNames.CardRecieveScreen} component={CardRecieveScreen}/>
      <Stack.Screen name={routeNames.SearchScreen} component={SearchScreen}/>
      <Stack.Screen name={routeNames.ReceiveTokenScreen} component={ReceiveTokenScreen}/>
      {/* <Stack.Screen name={routeNames.TokenAsset} component={AssetDetailScreen} /> */}
      <Stack.Screen name={routeNames.TodayReturns} component={TodaysReturnScreen} />
      <Stack.Screen name={routeNames.Supported} component={SupportedScreen} />
      <Stack.Screen name={routeNames.Spam} component={SpamScreen} />
      <Stack.Screen name={routeNames.Currency} component={SelectCurrency} />
      <Stack.Screen name={routeNames.Recepient} component={SelectRecepient} />
      <Stack.Screen name={routeNames.QR} component={SelectQR} />
      <Stack.Screen name={routeNames.SendDetails} component={SendDetails} />
      <Stack.Screen name={routeNames.Review} component={ReviewSend} />
      <Stack.Screen name={routeNames.AssetsScreen} component={AssetsScreen} />
      <Stack.Screen name={routeNames.TransactionStatus} component={TransactionStatus} />
      <Stack.Screen name={routeNames.TradeStatusScreen} component={TradeStatusScreen} />

    </Stack.Navigator>
  )
}

export default RootNavigator;
