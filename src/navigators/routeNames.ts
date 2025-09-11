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
  bottomScreen: "bottomScreen",
  ProsScreen: "ProsScreen",
  ProfileScreen: "ProfileScreen",
  Settings:"Settings",
  Security:"Security",
  Recovery:"Recovery",
  Privacy:"Privacy",
  Verification:"Verification",
  TokenAsset:"TokenDetail",
  ProfileBottom: "ProfileBottom", 
  CardReceiveScreen: "CardReceiveScreen",
  SearchScreen: "SearchScreen",
  ReceiveTokenScreen: "ReceiveTokenScreen",
  TodayReturns:"TodayReturns",
  TradeScreen: "TradeScreen",
  Supported:"Supported",
  Spam:"Spam",
  Currency:"Currency",
  Recipient:"Recipient",
  QR:"QR",
  SendDetails:"SendDetails",
  Review:"Review",
  TransactionStatus:"TransactionStatus",
  AssetsScreen: "AssetsScreen",
  TradeStatusScreen: "TradeStatusScreen",
  baseReceiveScreen: "baseReceiveScreen",
  AssetDetailScreen: 'assetDetail'
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
  bottomScreen: undefined
  ProsScreen: undefined
  ProfileScreen: undefined
  Settings: undefined
  Security:undefined
  Recovery:{email:string} | undefined
  Privacy:undefined
  Verification:undefined
  TokenDetail:undefined |  { contractAddress: string }
  ProfileBottom: undefined
    CardReceiveScreen: {
    card: {
      icon: any;
      title: string;
      address: string;
      background: any;
      backgroundColor?: string;
      value?: string;
    };
  };
  baseReceiveScreen: {
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
  Recipient:undefined
  QR:undefined
  SendDetails:undefined
  Review:undefined
  TransactionStatus:undefined
  AssetsScreen: undefined
  TradeStatusScreen: undefined
}