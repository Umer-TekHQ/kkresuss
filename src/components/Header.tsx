import React, { useEffect, useState } from 'react';
import { View, Image, Text, TouchableOpacity, ScrollView, FlatList, Dimensions, StatusBar, } from 'react-native';
import styles from '../styles/homestyles';
import { Images } from '../assets/index';
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'

  
const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()

export const CommonHeader: React.FC <{ title?: string }> = ({ title = 'Nate Diggity' }) => (
  
  <View style={styles.header}>
    
    <View style={styles.profileContainer} >
      <Image source={Images.profileicon} style={styles.profileIcon} />
      <Text style={styles.profileName}>{title}</Text>
    </View>
    
    <View style={styles.headerIcons}>
      <TouchableOpacity >
        <Image source={Images.scanner} style={styles.headerIcon} />
      </TouchableOpacity>
      <TouchableOpacity>
        <Image source={Images.secure} style={[styles.headerIcon, { marginLeft: 20 }]} />
      </TouchableOpacity>
    </View>
  </View>
);
