import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { AppNavigatorParamList } from '../navigators/routeNames'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

export type CheckboxRowProps = {
  
  isChecked: boolean
  onToggle: () => void
   hasLink?: boolean
    prefixText?: string
  linkText?: string
}


const CheckboxRow = ({ isChecked,onToggle,hasLink, prefixText = '',
  linkText = '', }: CheckboxRowProps) => {
 
    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()

  return (

      <View style={styles.row}>
      <TouchableOpacity style={styles.box} onPress={onToggle}>
        {isChecked && <Text style={styles.tick}>✓</Text>}
      </TouchableOpacity>

      {!hasLink ? (
       
          <Text style={styles.label}>{prefixText}</Text>
      
       ) 
      : (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
          <Text style={styles.label}>{prefixText} </Text>
          <TouchableOpacity >
            <Text style={styles.link}>{linkText}</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

export default CheckboxRow

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#0734A9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: '#0A0F61',

  },
  tick: {
    color: '#ADD2FD',
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: '#FFFFFF',
    fontSize: 15,
  },
    link: {
    textDecorationLine: 'underline',
    color: 'white',
  },
})
