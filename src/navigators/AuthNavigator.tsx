// import React from 'react';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { routeNames } from './routeNames';
// import { defaultScreenOptions } from './screenOptions';
// import { SplashScreen } from '../screens/Splash/SplashScreen';
// import WelcomeScreen from '../screens/Auth/WelcomeScreen';
// import { OtpScreen } from '../screens/Auth/OtpScreen';
// import { OtpSuccessScreen } from '../screens/Auth/OtpSuccessScreen';
// import { UserNameScreen } from '../screens';

// const AuthStack = createNativeStackNavigator();

// export const AuthNavigator = () => {
//   return (
//     <AuthStack.Navigator screenOptions={defaultScreenOptions}>
//       <AuthStack.Screen name={routeNames.splash} component={SplashScreen} />
//       <AuthStack.Screen name={routeNames.welcome} component={WelcomeScreen} />
//       <AuthStack.Screen name={routeNames.otp} component={OtpScreen} />
//       <AuthStack.Screen name={routeNames.otpSuccessScreen} component={OtpSuccessScreen} />
//       <AuthStack.Screen name={routeNames.username} component={UserNameScreen} />
//     </AuthStack.Navigator>
//   );
// };


import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SplashScreen } from '../screens/Splash/SplashScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import { OtpScreen } from '../screens/Auth/OtpScreen';
import { OtpSuccessScreen } from '../screens/Auth/OtpSuccessScreen';
import { UserNameScreen } from '../screens';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Otp" component={OtpScreen} />
    <AuthStack.Screen name="OtpSuccess" component={OtpSuccessScreen} />
    <AuthStack.Screen name="UserName" component={UserNameScreen} />
  </AuthStack.Navigator>
);
