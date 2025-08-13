import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../assets/index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../navigators/routeNames';

const { width: screenWidth } = Dimensions.get('window');

export const TokenActionButtons: React.FC = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const actions = [
    { name: 'Buy', icon: Images.buy },
    { name: 'Send', icon: Images.send },
    { name: 'Receive', icon: Images.recieve },
    { name: 'Cash Out', icon: Images.cash },
  ];

  const handlePress = (name: string) => {
    if (name === 'Send') {
      navigation.navigate('Currency');
    }
    // You can add navigation for other buttons here if needed
  };

  return (
    <View style={styles.actionButtonsContainer}>
      {actions.map((action) => (
        <TouchableOpacity
          key={action.name}
          style={styles.actionButton}
          onPress={() => handlePress(action.name)}
        >
          <Image source={action.icon} style={styles.actionButtonIcon} resizeMode="contain" />
          <Text style={styles.actionButtonText}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const BUTTON_SIZE = screenWidth * 0.18;
const ICON_SIZE = BUTTON_SIZE * 0.4;

const styles = StyleSheet.create({
  actionButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: screenWidth * 0.04,
    paddingHorizontal: screenWidth * 0.04,
  },
  actionButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    elevation: 2,
  },
  actionButtonIcon: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    marginBottom: 6,
  },
  actionButtonText: {
    fontSize: screenWidth * 0.035,
    color: '#fff',
    fontWeight: '500',
  },
});
