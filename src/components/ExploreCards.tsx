import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface ExploreCardProps {
  title: string;
  description: string;
  image: any;
}

export const ExploreCard: React.FC<ExploreCardProps> = ({ title, description, image }) => {
  return (
    <View style={styles.card}>
      <Image source={image} style={styles.image} resizeMode="cover" />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    backgroundColor: '#1E1E3F',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    height: 210,
    
  },
  image: {
    width: 170,
    height: 105,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 8,
  },
  title: {
    marginTop: 15,
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    marginTop: 3,
    color: 'lightblue',
    fontSize: 14,
    marginBottom: 20,
  },
});
