import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Colors } from '../theme/colors';

const PrivacyBody = () => (
  <View style={styles.whiteSection}>
    <Text style={styles.lastUpdated}>Last modified: February 20, 2024</Text>
    <Text style={styles.sectionTitle}>Introduction</Text>
    <Text style={styles.bodyText}>
      Kresus Labs, Inc. (“Kresus” or “We”) respect your privacy and are committed to protecting it. This Privacy
      Policy (the “Policy”) describes the types of Personal Data we may collect or that you may provide in
      connection with your access or use the Kresus website, kresus.com (the “Website”), the Kresus SuperApp (the
      “App”) and any other websites or apps that link to this Policy (jointly, the “Services”) and how we process
      your Personal Data. This Policy also explains your rights and choices about how we use your Personal Data, including how you can
      access or update certain information about you. Beyond the Privacy Policy, your use of our Services and
      Website is also subject to our
      <TouchableOpacity>
        <Text style={styles.link}> Terms and Conditions.</Text>
      </TouchableOpacity>
    </Text>
  </View>
);

export default PrivacyBody;

const styles = StyleSheet.create({
  whiteSection: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  lastUpdated: {
    color: Colors.black,
    fontSize: 13,
    fontWeight: '500',
    marginBottom: 16,
  },
  sectionTitle: {
    color: Colors.black,
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textDecorationLine: 'underline',
  },
  bodyText: {
    color: Colors.black,
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
  link: {
    color: Colors.lightblue,
    fontWeight: 'bold',
    top: 5,
  },
});
