import React from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { Images } from '../assets/index';
import { Colors } from '../theme/colors';

export const ExploreButtons: React.FC<{ 
  onPressAction: (name: string) => void, 
  activeSection?: string 
}> = ({ onPressAction, activeSection }) => {
  const actions = [
    { name: 'Trade', icon: Images.trade },
    { name: 'Earn', icon: Images.earn },
    { name: 'Social', icon: Images.social },
    { name: 'NFTs', icon: Images.nfts },
  ];

  return (
    <View>
      <View style={styles.actionButtonsContainer}>
        {actions.map((action) => {
          const isActive = action.name === activeSection;
          return (
            <TouchableOpacity
              key={action.name}
              style={styles.actionButton}
              onPress={() => onPressAction(action.name)}
              activeOpacity={0.8}
            >
              <Image
                source={action.icon}
                style={[
                  styles.actionButtonIcon,
                  { tintColor: isActive ? Colors.white : Colors.activeTint },
                ]}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  { color: isActive ? Colors.white : Colors.activeTint },
                ]}
              >
                {action.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.underlineContainer}>
        {actions.map((action) => {
          const isActive = action.name === activeSection;
          return (
            <View
              key={`underline-${action.name}`}
              style={[
                styles.underlineSegment,
                { backgroundColor: isActive ? Colors.back : Colors.background2 },
              ]}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    alignItems: 'center',
    width: '20%',
  },
  actionButtonIcon: {
    resizeMode: 'contain',
    width: wp('5.5%'),
    height: hp('6%'),
    marginBottom: -5
  },
  actionButtonText: {
    fontSize: 14,
  },
  actionButtonsContainer: {
    paddingHorizontal: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  underlineContainer: {
    flexDirection: 'row',
    height: 2,
  },
  underlineSegment: {
    flex: 1,
  },
});
