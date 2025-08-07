
import React from 'react'
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native'
import { Images } from '../assets'
import { useNavigation, NavigationProp } from '@react-navigation/native'
import { AppNavigatorParamList } from '../navigators/routeNames'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { Dimensions } from 'react-native'



interface AppHeaderProps {
  title: string
  showClose?: boolean 
 onBackPress?: () => void;
}

const { width } = Dimensions.get('window')
const ICON_SIZE = width * 0.085

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
        <Image source={Images.backscreen} style={styles.iconImage} />
      </TouchableOpacity>

      <Text style={styles.title}>{title}</Text>

      {showClose && (
        <TouchableOpacity style={styles.rightIcon}>
         <Image source={Images.whitecross} style={styles.iconImage} /> 
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
    backgroundColor: '#010D2A',
    position: 'relative',
  },
  icon: {
    opacity:1,
    position: 'absolute',
   // left: 20, ( as qa reuired )
     zIndex: 20, 
  },
  rightIcon: {
    position: 'absolute',
    right: 10,
    top:10
  },
  // iconImage: {
  //   width: 32,
  //   height: 32,
  //   resizeMode:'contain'
  // },
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
    color: 'white',
  },
})
