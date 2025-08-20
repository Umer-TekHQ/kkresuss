import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../assets'; 
import { ImageSourcePropType } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'



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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={leftIcon || Images.backscreen} style={styles.icon1} />
        </TouchableOpacity>
      </View>

    
      <Text style={styles.title}>{title}</Text>

    
      <View style={styles.sideContainer}>
        {showRightIcons ? (
          <TouchableOpacity onPress={onRightPress}>
          <View style={styles.rightIcons}>
            <Image source={Images.bothsolanabase} style={styles.icon} />
            <Image source={Images.down} style={[styles.icon, { marginLeft: 8 }]} />
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
    width: 70, //real is 50 
    alignItems: 'flex-start',
   
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  icon: {
    width: 33,
    height: 33,
    resizeMode: 'contain',
  },
  icon1: {
    width: 31,
    height: 31,
    resizeMode: 'contain',
    tintColor: 'white',
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
