import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';

type Props = {
  onBack: () => void;
};

const TopIcons = ({ onBack }: Props) => (
  <View style={styles.topIcons}>
    <TouchableOpacity activeOpacity={0.7} onPress={onBack}>
      <Image source={Images.backButton} style={styles.backIcon} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={Images.comment} style={styles.commentIcon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  topIcons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    paddingHorizontal: 15,
    zIndex: 10,
  },
  backIcon: { width: 30, height: 30 },
  commentIcon: { width: 40, height: 40 },
});

export default TopIcons;
