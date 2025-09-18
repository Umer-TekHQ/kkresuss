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

import { Colors } from '../theme/colors'

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
             style,
              value.length > 0 && styles.inputWithText,
          ]}
        />

        {value.length > 0 && (
          <>
            <Text style={styles.label}>{placeholder}</Text>
            <TouchableOpacity
         
               onPress={() => {
                if (onChangeText) {
                  onChangeText('') 
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
    height: 65,
    borderRadius: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.fieldBackground,
    color: Colors.white,
    fontSize: 19,
    paddingRight: 40,
    textAlignVertical: 'center', 
    borderColor: Colors.fieldBorder,
    borderWidth:1,
  },

  label: {
    position: 'absolute',
    top: 6,
    left: 16,
    fontSize: 13,
    color: Colors.lightblue,
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
  backgroundColor: Colors.fieldBackground1,
  borderColor: Colors.blue,
},  inputWithText: {
    paddingTop: 17, 
  },


})
