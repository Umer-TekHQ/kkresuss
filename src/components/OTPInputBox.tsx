import React, { useRef, useState } from 'react'
import {
  View,
  TextInput,
  StyleSheet,
  Dimensions,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable
} from 'react-native'

interface Props {
  onStartTyping?: () => void
  onComplete?: (otp: string) => void
}

const { width } = Dimensions.get('window')

const OTPInputBox = ({ onStartTyping, onComplete }: Props) => {
  const inputRef = useRef<TextInput>(null)
  const [otp, setOtp] = useState<string>('')

  const handleChange = (value: string) => {
    const clean = value.replace(/[^0-9]/g, '')
    if (clean.length <= 6) {
      if (clean.length === 1 && otp.length === 0) onStartTyping?.()
      if (clean.length === 6) {
        onComplete?.(clean)
        Keyboard.dismiss()
      }
      setOtp(clean)
    }
  }

  const handleBoxPress = (index: number) => {
    const newOtp = otp.slice(0, index)
    setOtp(newOtp)
    inputRef.current?.focus()
  }




  return (
    <View style={styles.wrapper}>
      <View style={styles.boxRow}>
        {Array(6).fill('').map((_, i) => (
          <TouchableWithoutFeedback key={i} onPress={() => handleBoxPress(i)}>
            <View style={[styles.box, otp.length === i && styles.activeBox]}>
              <Text style={styles.digit}>{otp[i] || ''}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>

      <TextInput
      caretHidden={true}
        ref={inputRef}
        value={otp}
        onChangeText={handleChange}
        maxLength={6}
        keyboardType="number-pad"
        autoFocus
        style={styles.hiddenInput}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 20,
    alignItems: 'center',
  },
  boxRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: width * 0.8,
    columnGap: 8,
  },
  box: {
    width: 48,
    height: 70,
    borderWidth: 1,
    borderColor: '#ADD2FD',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8, 12, 76, 0.66)',
  },
  activeBox: {
    borderColor: '#FFFFFF',
  },
  digit: {
    width: 26,
    height: 37,
    fontSize: 44,
    lineHeight: 37,
    textAlign: 'center',
    fontWeight: '300',
    color: '#FFFFFF',
  },
  hiddenInput: {
    position: 'absolute',
  opacity: 0.05,  
  height: 20,    
  width: width * 0.8,
  textAlign: 'center',
  paddingTop: 15,
  },
})

export default OTPInputBox
