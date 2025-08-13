import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from 'react-native'
import { Images } from '../assets'

interface Props {
  label: string
  onPress?: (event: GestureResponderEvent) => void
}

const SecondaryButtonWithIcon = ({ label, onPress }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} activeOpacity={0.7}>
      <Image
        source={Images.insured}
        style={styles.icon}
        resizeMode="contain"
      />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

export default SecondaryButtonWithIcon

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: '#4898F3',
    alignSelf: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight:'bold',
    color: '#FFFFFF',
    textAlign: 'center',
  },
})
