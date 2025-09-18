import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Images } from '../assets/index';
import { AppNavigatorParamList } from '../navigators/routeNames';

import { Colors } from '../theme/colors';

const { width: screenWidth } = Dimensions.get('window');

export const ActionButtons: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

const actions = [
  {
    name: 'Earn',
    icon: Images.earn,
    buttonStyle: styles.earnButton,
    iconStyle: styles.earnIcon,
    textStyle: styles.earnText,
  },
  {
    name: 'Buy',
    icon: Images.buy,
    buttonStyle: styles.buyButton,
    iconStyle: styles.buyIcon,
    textStyle: styles.buyText,
  },
  {
    name: 'Send',
    icon: Images.send,
    buttonStyle: styles.sendButton,
    iconStyle: styles.sendIcon,
    textStyle: styles.sendText,
  },
  {
    name: 'Receive',
    icon: Images.receive,
    buttonStyle: styles.receiveButton,
    iconStyle: styles.receiveIcon,
    textStyle: styles.receiveText,
  },
];


  const handlePress = (name: string) => {
    if (name === 'Send') {
      navigation.navigate('Currency');
    } else if (name === 'Receive') {
      navigation.navigate('ProfileScreen');
    }
  };

  return (
    <View style={styles.actionButtonsContainer}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.name}
          style={[styles.actionButton, action.buttonStyle]}
          onPress={() => handlePress(action.name)}
        >
          <Image
            source={action.icon}
            style={[styles.actionButtonIcon, action.iconStyle]}
            resizeMode="contain"
          />
          <Text style={[styles.actionButtonText, action.textStyle]}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BUTTON_SIZE = screenWidth * 0.18;
const ICON_SIZE = BUTTON_SIZE * 0.45;

const styles = StyleSheet.create({

  actionButtonsContainer: {
    flexDirection: 'row',
    marginTop: screenWidth * 0.02,
    marginBottom: screenWidth * 0.04,
    justifyContent: 'space-around',
    marginHorizontal: wp('6%'),
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
  },
  actionButtonIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
  },
  actionButtonText: {
    fontSize: screenWidth * 0.035,
    fontWeight: '500',
    marginTop: 4,
  },

  earnButton: { },
  earnIcon: { tintColor: Colors.white },
  earnText: { color: Colors.white },

  buyButton: { },
  buyIcon: { tintColor: Colors.white, width: 33, height: 33 },
  buyText: { color: Colors.white, top: -3  },

  sendButton: { },
  sendIcon: { tintColor: Colors.white },
  sendText: { color: Colors.white },

  receiveButton: { },
  receiveIcon: { tintColor: Colors.white },
  receiveText: { color: Colors.white, },
});

// });

