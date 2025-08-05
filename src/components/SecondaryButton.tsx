import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent,
  ViewStyle,
  TextStyle,
} from 'react-native'

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
    borderColor: '#4898F3',
    alignSelf: 'center',
  },
  label: {
    fontSize: 14,
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
