import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

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
    width: wp('47%'),
    backgroundColor: '#080C4C',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    height: hp('30%'),
    borderTopWidth: 2.5,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    borderColor: '#080C4C'
  },
  image: {
    width: wp('47%'),
    height: hp('15%'),
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    paddingHorizontal: 12,
    justifyContent: 'space-between'
  },
  title: {
    marginTop: 15,
    color: '#fff',
    fontSize: 19,
    marginBottom: 4,
  },
  description: {
    marginTop: 3,
    color: '#ADD2FD',
    fontSize: 15,
    lineHeight: 19,
  },
});
