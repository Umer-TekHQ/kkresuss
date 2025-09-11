import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, Text, StyleSheet } from 'react-native';

import { Images } from '../assets';
import AssetsScreen from '../screens/Assets/AssetsScreen';
import { ExploreScreen } from '../screens/Explore/ExploreScreen';
import { HomeScreen } from '../screens/HomeScreen/HomeScreen';
import { TradeScreen } from '../screens/Trade/TradeScreen';
// import styles from '../styles/homestyles';

const Tab = createBottomTabNavigator();

const tabBarIcons: Record<string, any> = {
  Home: Images.home,
  Assets: Images.assets,
  Trade: Images.trade,
  Explore: Images.explore,
};

export const BottomNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }: any) => ({
        headerShown: false,
        tabBarShowLabel: true,
        tabBarHideOnKeyboard: true,
        tabBarIcon: ({ focused }: any) => {
          const iconSource = tabBarIcons[route.name] || Images.home;
          const iconStyle = focused
            ? styles.activeFooterIcon
            : styles.inactiveFooterIcon;

          return (
            <Image source={iconSource} style={iconStyle} resizeMode="contain" />
          );
        },
        tabBarLabel: ({ focused }: any) => {
          const textStyle = focused
            ? styles.activeFooterText
            : styles.inactiveFooterText;
          return (
            <Text
              style={[{ fontSize: 12, textAlign: 'center' }, textStyle]}
            >
              {route.name}
            </Text>
          );
        },
        tabBarStyle: {
          ...styles.footer,
          height: 60,
          paddingBottom: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Assets" component={AssetsScreen} />
      <Tab.Screen name="Trade" component={TradeScreen} />
      <Tab.Screen name="Explore" component={ExploreScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({

activeFooterIcon: {
  width: 24,
  height: 24,
  tintColor: '#ffffff', 
},
inactiveFooterIcon: {
  width: 24,
  height: 24,
  tintColor: '#7AB7FD',
},
activeFooterText: {
  color: '#ffffff',
  fontWeight: '600',
},
inactiveFooterText: {
  color: '#7AB7FD',
},
footer: {
  backgroundColor: '#01021d',
  borderTopWidth: 0.5,
  borderTopColor: '#10178A',
},
})