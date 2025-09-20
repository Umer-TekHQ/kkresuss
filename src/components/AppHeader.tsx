import { useNavigation} from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

import { Images } from '../assets'
import { AppNavigatorParamList } from '../navigators/routeNames'
import { Colors } from '../theme/colors'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'


interface AppHeaderProps {
  title: string
  showClose?: boolean 
 onBackPress?: () => void;
}

const { width } = Dimensions.get('window')
const ICON_SIZE = width * 0.10 

const AppHeader = ({ title, showClose = false, onBackPress }: AppHeaderProps) => {
   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()

const handleGoBack = () => {
    if (onBackPress) {
      onBackPress(); 
    } else {
      navigation.goBack(); 
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleGoBack} style={styles.icon}>
        <Image source={Images.backButton} style={styles.iconImage} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {showClose && (
        <TouchableOpacity style={styles.rightIcon}>
         <Image source={Images.whiteCross} style={styles.iconImage} /> 
        </TouchableOpacity>
      )}
    </View>
  )
}

export default AppHeader

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    paddingHorizontal: 20,
    position: 'relative',
  },
  icon: {
    opacity:1,
    position: 'absolute',
    left: 6, 
     zIndex: 20, 
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    top:10
  },
  iconImage: {
  width: ICON_SIZE,
  height: ICON_SIZE,
  resizeMode: 'contain',
},
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '500',
    color: Colors.white,
  },
})
