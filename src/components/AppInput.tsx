import React from 'react'
import {
  TextInput,
  StyleSheet,
  Dimensions,
  View,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native'
import { Images } from '../assets'

const { width } = Dimensions.get('window')

interface AppInputProps {
  placeholder: string
  value: string                          
  onChangeText?: (text: string) => void
  onClear?: () => void       
  isElevated?: boolean       
  style?: any       
}

const AppInput = ({ placeholder, value, onChangeText, onClear,isElevated ,style}: AppInputProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#ADD2FD"
          style={[styles.input,
             isElevated && styles.elevatedInput,
             style
          ]}
        />

        {value.length > 0 && (
          <>
            <Text style={styles.label}>{placeholder}</Text>
            <TouchableOpacity
         
              onPress={() => {
             if (onChangeText) {
             onChangeText(value.slice(0, -1)) 
              }
            }}
              style={styles.clearButton}
            >
              <Image
                source={Images.cross}
                style={styles.crossIcon}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  )
}

export default AppInput

const styles = StyleSheet.create({
  container: {
    width: width * 0.9,
    marginVertical: 12,
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  input: {
    width: '100%',
    height: 60,
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingTop: 18,
   backgroundColor: '#0B1171',
    color: '#FFFFFF',
    fontSize: 18,
    paddingRight: 40,
    textAlignVertical: 'center',
    borderColor:'#0734A9',
    borderWidth:1,

  },
  label: {
    position: 'absolute',
    top: 6,
    left: 16,
    fontSize: 13,
    color: '#ADD2FD',
  },
  clearButton: {
    position: 'absolute',
    right: 12,
    bottom: 20,
  },
  crossIcon: {
    width: 18,
    height: 18,
  },
  elevatedInput: {
  backgroundColor: '#080C50',
  borderColor: '#4898F3',
},

})
