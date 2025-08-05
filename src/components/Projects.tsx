import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Images } from '../assets/index'; 
import styles from '../styles/homestyles';


const { width: screenWidth } = Dimensions.get('window');

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
          <Image source={Images.projectlogo} style={styles.logo} />
          <View style={{ marginLeft: 10 }}>
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
