import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { ImageSourcePropType } from 'react-native';

import { Images } from '../assets';
import { AppNavigatorParamList } from '../navigators/routeNames'

import { Colors } from '../theme/colors';



interface HeaderProps {
  title: string;
  showRightIcons?: boolean;
  leftIcon?: ImageSourcePropType;
  onRightPress?: () => void;
}


const AssetsHeader: React.FC<HeaderProps> = ({ title, showRightIcons = false ,leftIcon, onRightPress}) => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  return (
    <View style={styles.headerContainer}>
    
      <View style={styles.sideContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('BottomNavigator')}>
          <Image source={leftIcon || Images.backScreen} style={styles.icon1} />
        </TouchableOpacity>
      </View>

    
      <Text style={styles.title}>{title}</Text>

    
      <View style={styles.sideContainer}>
        {showRightIcons ? (
          <TouchableOpacity onPress={onRightPress}>
          <View style={styles.rightIcons}>
            <Image source={Images.bothSolanaBase} style={styles.icon} />
            <Image source={Images.down} style={styles.icon} />
          </View>
          </TouchableOpacity>
        ) 
        : null}
      </View>
    </View>
  );
};


export default AssetsHeader;

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginTop: 10,
  },
  sideContainer: {
    width: 70, 
    alignItems: 'flex-start',
   
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    marginTop: 4,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 8 
  },
  icon1: {
    width: 30,
    height: 30,
    marginTop: 6,
    marginLeft: 5,
    resizeMode: 'contain',
    tintColor: Colors.white,
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
