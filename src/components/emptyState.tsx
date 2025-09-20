import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Colors } from '../theme/colors';

const EmptyState = () => (
  <View style={styles.emptyContainer}>
    <Text style={styles.emptyTitle}>No Supported Tokens Found</Text>
    <Text style={styles.emptySubtitle}>
      Please double-check your search and try again.
    </Text>
  </View>
);

export default EmptyState;

const styles = StyleSheet.create({
  emptyContainer: {
    marginTop: 30,
    paddingHorizontal: 20,
  },
  emptyTitle: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '600',
    marginBottom: 6,
  },
  emptySubtitle: {
    color: Colors.lightblue,
    fontSize: 15,
  },
});
