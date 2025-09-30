import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';

import { Images } from '../assets/index'; 
import { Colors } from '../theme/colors';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const Projects = () => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.earnBadge}>
        <TouchableOpacity>
            <Text style={styles.earnBadgeText}>Earn</Text>
        </TouchableOpacity>
      </View>

      <Image source={Images.projects} style={styles.bannerImage} resizeMode="cover" />

      <View style={styles.bottomSection}>
        <View style={styles.logoAndText}>
          <Image source={Images.projectLogo} style={styles.logo} />
          <View style={styles.text}>
            <Text style={styles.title}>Farm the highest yields</Text>
            <Text style={styles.subtitle}>Extra Fi</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.launchButton}>
          <Text style={styles.launchButtonText}>Launch</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  cardContainer: {
    borderWidth: 1,
    borderColor: Colors.background2,
    width: '92%',
    height: screenHeight * 0.42, 
    backgroundColor: Colors.fieldBackground1,
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: screenHeight * 0.015,
    paddingBottom: screenHeight * 0.015,
    marginTop: screenHeight * 0.013,
    marginLeft: 15,
  },
  text:{
    marginLeft: 10
  },
    earnBadge: {
    position: 'absolute',
    top: 10,
    left: 8,
    zIndex: 1,
    backgroundColor: Colors.fieldBorder,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  earnBadgeText: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  bannerImage: {
    width: '100%',
    height: screenHeight * 0.30, 
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  bottomSection: {
    marginTop: 10,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoAndText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 40,
    height: 40,
    marginBottom: 20,
    borderRadius: screenWidth * 0.02,
    marginTop: 10,
  },
  title: {
    color: Colors.white,
    fontSize: 14,
    width: screenWidth * 0.35,
  },
  subtitle: {
    color: Colors.lightblue,
    fontSize: 11,
    marginTop: 2,
  },
  launchButton: {
    backgroundColor: Colors.white,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 22,
  },
  launchButtonText: {
    color: Colors.fieldBackground1,
    fontWeight: '600',
    fontSize: 13,
  },

  })