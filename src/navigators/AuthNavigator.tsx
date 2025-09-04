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
