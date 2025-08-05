import React from 'react';
import { View, TouchableOpacity, Image, Text } from 'react-native';
import styles from '../styles/homestyles';
import { Images } from '../assets/index';

export const ExploreButtons: React.FC = () => {
  const actions = [
    { name: 'Trade', icon: Images.trade }, 
    { name: 'Earn', icon: Images.earn },
    { name: 'Social', icon: Images.social },
    { name: 'NFTs', icon: Images.nfts },
  ];

  return (
    <View style={styles.actionButtonsContainer}>
      {actions.map((action) => (
        <TouchableOpacity key={action.name} style={styles.actionButton}>
          <Image source={action.icon} style={styles.actionButtonIcon} />
          <Text style={styles.actionButtonText}>{action.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

