import React,{ReactNode} from 'react'
import { View, Image, DimensionValue} from 'react-native'
import { StyleProp, ViewStyle ,TouchableOpacity,Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient'

import { Images } from '../assets'
import BackgroundStyles from '../styles/Background.styles'
import { Colors } from '../theme/colors';

type Props = {
  showContent?: boolean
   children?: ReactNode
   showLogo?: boolean 
    hideBottomImages?: boolean
    containerHeight?: DimensionValue
    containerStyle?: StyleProp<ViewStyle>;
     showLostAccess?: boolean
}

const Background = ({ showContent = true,children ,showLogo,hideBottomImages,containerHeight, containerStyle , showLostAccess = false  }: Props) => {
  return (
    <LinearGradient
     colors={[Colors.background2,  Colors.background3]} 
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
               {showLostAccess && (
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={BackgroundStyles.lostAccessContainer}
                >
                  <Text style={BackgroundStyles.lostAccessText}>
                    Lost access to email or phone?
                  </Text>
                </TouchableOpacity>
              )}
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
