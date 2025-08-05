import React,{ReactNode} from 'react'
import { View, Image, StyleSheet, Dimensions ,DimensionValue} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { Images } from '../assets'
import BackgroundStyles from '../styles/Background.styles'
import { StyleProp, ViewStyle } from 'react-native';



type Props = {
  showContent?: boolean
   children?: ReactNode
   showLogo?: boolean 
    hideBottomImages?: boolean
    containerHeight?: DimensionValue
    containerStyle?: StyleProp<ViewStyle>;
}

const Background = ({ showContent = true,children ,showLogo,hideBottomImages,containerHeight, containerStyle  }: Props) => {
  return (
    <LinearGradient
     colors={['#080C4C',  '#0E1799']} 
  locations={[0, 1]}
    style={[
    BackgroundStyles.gradient,
    { height: containerHeight ?? '100%' },
    containerStyle, 
  ]} 
    >
       {showContent && (
 <View  style={BackgroundStyles.WrapperView}> 

     {showLogo !== false && (
      <Image source={Images.logo} style={BackgroundStyles.logo} resizeMode="cover" />
    )}
{!hideBottomImages &&(
      <View style={BackgroundStyles.bottomContainer}>
        <Image source={Images.waves} style={BackgroundStyles.waves} resizeMode="stretch" />
        <Image source={Images.land1} style={BackgroundStyles.land1} resizeMode="contain" />
        <Image source={Images.land2} style={BackgroundStyles.land2} resizeMode="contain" />
      </View>
    )}
   
</View>
       )}
    {children && (
        <View style={BackgroundStyles.childrenContainer}>
          {children}
        </View>
      )}
   

    </LinearGradient>
  )
}

export default Background
