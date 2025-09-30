import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';

import AppButton from "./AppButton";
import { AppNavigatorParamList } from '../navigators/routeNames';


interface Props {
  disabled: boolean;
}

const ReviewButtonSection = ({ disabled }: Props) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  return (
      <View style={styles.buttonWrapper}>
        <AppButton label="Review Transfer" onPress={() => navigation.navigate('Review')} disabled={disabled} />
      </View>
  );
};

export default ReviewButtonSection;

const styles = StyleSheet.create({
  buttonWrapper: {
    paddingBottom: 20,
  },
});
