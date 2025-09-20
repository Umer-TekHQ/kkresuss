import React from 'react'
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
  GestureResponderEvent,
} from 'react-native'

import { Images } from '../assets'
import { Colors } from '../theme/colors'

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
    alignSelf: 'center',
    borderWidth: 1,
    borderColor: Colors.blue,
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginTop: 1,
    alignItems: 'center',
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  label: {
    fontSize: 15,
    fontWeight:'bold',
    color: Colors.white,
    textAlign: 'center',
  },
})
