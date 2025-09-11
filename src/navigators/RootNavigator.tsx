import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { AuthNavigator } from './AuthNavigator';
import { MainNavigator } from './MainNavigator';
import { defaultScreenOptions } from './screenOptions';

const RootStack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
      <RootStack.Navigator screenOptions={defaultScreenOptions}>
        <RootStack.Screen
          name="AuthStack"
          component={AuthNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="MainStack"
          component={MainNavigator}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
  );
}
