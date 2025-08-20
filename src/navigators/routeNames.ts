import { Token } from '../screens/Trade/types';

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
  TradeScreen: "TradeScreen",
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
      value?: string;
    };
  };
  TradeScreen: undefined,
  SearchScreen: { field: 'token1' | 'token2'; onSelectToken?: (token: Token) => void; excludeToken?: string };
  ReceiveTokenScreen: { field: 'token1' | 'token2'; onSelectToken?: (token: Token) => void; excludeToken?: string };
  TodayReturns:undefined
  Supported:undefined
   Spam: { defaultTab?: 'Crypto' | 'NFTs' };
  Currency:undefined
  Recepient:undefined
  QR:undefined
  SendDetails:undefined
  Review:undefined
  TransactionStatus:undefined
  AssetsScreen: undefined
  TradeStatusScreen: undefined
}