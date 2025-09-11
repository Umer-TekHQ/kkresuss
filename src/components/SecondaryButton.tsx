import React from 'react'
import {TouchableOpacity,Text,StyleSheet,GestureResponderEvent,} from 'react-native'

import { Colors } from '../theme/colors'

interface Props {
  label: string
  onPress?: (event: GestureResponderEvent) => void
}

const SecondaryButton = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7}>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryButton

const styles = StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: Colors.blue,
    alignSelf: 'center',
    
  },
  label: {
    fontSize: 15,
    color: Colors.white,
    textAlign: 'center',
  },
})
