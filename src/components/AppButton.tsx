import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Dimensions,
   ViewStyle,
   StyleProp
} from 'react-native'

import type { DimensionValue } from 'react-native'
const { width: screenWidth } = Dimensions.get('window')

interface AppButtonProps {
  label: string
  onPress: () => void
  width?: DimensionValue 
  disabled?: boolean
}

const AppButton = ({ label, onPress, width,disabled }: AppButtonProps) => {
const handlePress = () => {
    if (!disabled) {
      onPress()
    }
  }


  return (
    <TouchableOpacity
      onPress={handlePress}
       disabled={disabled} 
      style={[styles.button, { width: width || screenWidth * 0.9 }, disabled && { backgroundColor: '#cccccc' }, ]} 
      activeOpacity={0.8}
    >
      <Text style={styles.label}
        numberOfLines={1}
       ellipsizeMode="tail"
         adjustsFontSizeToFit
      > 
        {label}</Text>
    </TouchableOpacity>
  )
}

export default AppButton

const styles = StyleSheet.create({
  button: {

    height: 55,
    backgroundColor: '#FFFFFF',
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    position: 'absolute', 
    bottom:-6, //orignal was 1
    alignSelf: 'center',
    zIndex: 20,
    
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#01032C',
  },
})
