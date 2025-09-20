import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import BottomSheetHome from './BottomSheetHome';
import { AppNavigatorParamList } from '../navigators/routeNames';

type Props = { navigation: NativeStackNavigationProp<AppNavigatorParamList> };

export const BottomSheetWrapper = ({ navigation }: Props) => (
  <View pointerEvents="box-none" style={styles.container}>
    <BottomSheetHome navigation={navigation} />
  </View>
);

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    pointerEvents: 'box-none',
    width: '100%',
  },
});
