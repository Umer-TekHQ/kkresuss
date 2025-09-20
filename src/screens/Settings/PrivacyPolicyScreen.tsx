import React from 'react';
import { View, StyleSheet } from 'react-native';

import PrivacyBody from '../../components/privacyBody';
import PrivacyHeader from '../../components/privacyHeader';
import PrivacyTopSection from '../../components/privacyTopSection';

const PrivacyPolicyScreen = () => (
  <View style={styles.container}>
    <PrivacyHeader />
    <PrivacyTopSection />
    <PrivacyBody />
  </View>
);

export default PrivacyPolicyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070942',
  },
});
