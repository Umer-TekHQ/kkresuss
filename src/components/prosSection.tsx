import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

import { Images } from '../assets';

type Props = { onPress: () => void };

export const ProsSection = ({ onPress }: Props) => (
  <View style={styles.container}>
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>What the Pros are Buying</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={onPress}>
      <Image source={Images.pros} style={styles.icon} />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: { flexDirection: 'row', justifyContent: 'space-between' },
  text: { color: '#7AB7FD', fontSize: 16, marginTop: 4, marginLeft: 15, marginBottom: 15 },
  icon: { marginRight: 20, width: 36, height: 36 },
});
