import { BottomSheetScreen } from '../screens/BottomSheetScreen/BottomSheetScreen';
import { ProsScreen } from '../screens/Pros/ProsScreen';
import { ProfileScreen } from '../screens/Profile/ProfileScreen';
import { ProfileBottom } from '../screens/Profile/ProfileBottomSheet';
import CardRecieveScreen from '../screens/Profile/CardRecieveScreen';
import { Token } from '../screens/Trade/types';
import ReceiveTokenScreen from '../screens/Trade/ReceiveSearchScreen';
import AssetsScreen from '../screens/Assets/AssetsScreen';
import TradeStatusScreen from '../screens/Trade/TradeStatusScreen';

export const routeNames = {
  splash: "Splash",
  welcome: "Welcome",
  homeScreen: "Home",
  otp: "Otp",
  otpSuccessScreen: "OtpSuccess",
  username: "UserName",
  BottomNavigator: "BottomNavigator",
  prosScreen: "prosScreen",
  bottomscreen: "bottomscreen",
  ProsScreen: "ProsScreen",
  ProfileScreen: "ProfileScreen",
  Settings:"Settings",
  Security:"Security",
  Recovery:"Recovery",
  Privacy:"Privacy",
  Verification:"Verification",
  TokenAsset:"TokenDetail",
  ProfileBottom: "ProfileBottom", 
  CardRecieveScreen: "CardRecieveScreen",
  SearchScreen: "SearchScreen",
  ReceiveTokenScreen: "ReceiveTokenScreen",
  TodayReturns:"TodayReturns",
  Supported:"Supported",
  Spam:"Spam",
  Currency:"Currency",
  Recepient:"Recepient",
  QR:"QR",
  SendDetails:"SendDetails",
  Review:"Review",
  TransactionStatus:"TransactionStatus",
  AssetsScreen: "AssetsScreen",
  TradeStatusScreen: "TradeStatusScreen"
} as const

export type AppNavigatorParamList = {
  Splash: undefined
  Welcome: undefined
  Home: undefined
  Otp: undefined
  OtpSuccess: undefined
  BottomNavigator: {
    screen?: string;
  } | undefined
  UserName: undefined
  bottomscreen: undefined
  ProsScreen: undefined
  ProfileScreen: undefined
  Settings: undefined
  Security:undefined
  Recovery:{email:string} | undefined
  Privacy:undefined
  Verification:undefined
  TokenDetail:undefined
  ProfileBottom: undefined
    CardRecieveScreen: {
    card: {
      icon: any;
      title: string;
      address: string;
      background: any;
      backgroundColor?: string;
    };
  };
  SearchScreen: {
    field: 'token1' | 'token2';
    onSelectToken?: (token: Token) => void;
  };
    ReceiveTokenScreen: {
    field: 'token1' | 'token2';
    onSelectToken?: (token: Token) => void;
  };
  TodayReturns:undefined
  Supported:undefined
  Spam:undefined
  Currency:undefined
  Recepient:undefined
  QR:undefined
  SendDetails:undefined
  Review:undefined
  TransactionStatus:undefined
  AssetsScreen: undefined
  TradeStatusScreen: undefined
}