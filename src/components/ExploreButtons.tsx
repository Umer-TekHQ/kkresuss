import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native';
import { Images } from '../assets/index';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export const ExploreButtons: React.FC<{ onPressAction: (name: string) => void }> = ({ onPressAction }) => {
  const actions = [
    { name: 'Trade', icon: Images.trade },
    { name: 'Earn', icon: Images.earn },
    { name: 'Social', icon: Images.social },
    { name: 'NFTs', icon: Images.nfts },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <View>
      <View style={styles.actionButtonsContainer}>
        {actions.map((action, index) => {
          const isActive = index === activeIndex;
          return (
            <TouchableOpacity
              key={action.name}
              style={styles.actionButton}
              onPress={() => {
                setActiveIndex(index);
                onPressAction(action.name);
              }}
              activeOpacity={0.8}
            >
              <Image
                source={action.icon}
                style={[
                  styles.actionButtonIcon,
                  { tintColor: isActive ? '#FFFFFF' : '#7AB7FD' },
                ]}
              />
              <Text
                style={[
                  styles.actionButtonText,
                  { color: isActive ? '#FFFFFF' : '#7AB7FD' },
                ]}
              >
                {action.name}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <View style={styles.underlineContainer}>
        {actions.map((_, index) => {
          const isActive = index === activeIndex;
          return (
            <View
              key={`underline-${index}`}
              style={[
                styles.underlineSegment,
                { backgroundColor: isActive ? '#086DE1' : '#080C4C' },
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
