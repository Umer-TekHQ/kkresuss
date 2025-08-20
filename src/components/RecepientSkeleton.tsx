import React from 'react';
import { View, StyleSheet } from 'react-native';

const RecepientSkeleton = () => {
  return (
    <View style={styles.itemContainer}>
      <View style={styles.imagePlaceholder} />
      <View style={styles.textContainer}>
        <View style={styles.namePlaceholder} />
        <View style={styles.emailPlaceholder} />
      </View>
    </View>
  );
};

export default RecepientSkeleton;

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    marginBottom: 10,
  },
  imagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#062FA3',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  namePlaceholder: {
    height: 15,
    width: '60%',
    backgroundColor: '#062FA3',
    marginBottom: 6,
    borderRadius: 4,
  },
  emailPlaceholder: {
    height: 13,
    width: '40%',
    backgroundColor: '#062FA3',
    borderRadius: 4,
  },
});
