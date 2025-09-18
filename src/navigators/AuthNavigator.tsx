import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { UserNameScreen } from '../screens';
import { OtpScreen } from '../screens/Auth/OtpScreen';
import { OtpSuccessScreen } from '../screens/Auth/OtpSuccessScreen';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import { SplashScreen } from '../screens/Splash/SplashScreen';

const AuthStack = createNativeStackNavigator();

export const AuthNavigator = () => (
  <AuthStack.Navigator 
    screenOptions={{
      headerShown: false,
      animation: 'slide_from_right', 
      animationTypeForReplace: 'push', 
    }}>
    <AuthStack.Screen name="Splash" component={SplashScreen} />
    <AuthStack.Screen name="Welcome" component={WelcomeScreen} />
    <AuthStack.Screen name="Otp" component={OtpScreen} />
    <AuthStack.Screen name="OtpSuccess" component={OtpSuccessScreen} />
    <AuthStack.Screen name="UserName" component={UserNameScreen} />
  </AuthStack.Navigator>
);
