import { useNavigation} from '@react-navigation/native'
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Dimensions } from 'react-native'

import { Images } from '../assets'
import { AppNavigatorParamList } from '../navigators/routeNames'

import type { NativeStackNavigationProp } from '@react-navigation/native-stack'

import { Colors } from '../theme/colors'

interface AppHeaderProps {
  title: string
  showClose?: boolean 
 onBackPress?: () => void;
}

const { width } = Dimensions.get('window')
const ICON_SIZE = width * 0.08 

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
        <Image source={Images.backScreen} style={styles.iconImage} />
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
    marginVertical: 30,
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
    fontSize: 18,
    fontWeight: '600',
    color: Colors.white,
  },
})
