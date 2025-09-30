import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

import { Colors } from '../theme/colors'

export type CheckboxRowProps = {
  isChecked: boolean
  onToggle: () => void
  hasLink?: boolean
  prefixText?: string
  linkText?: string
}


const CheckboxRow = ({ isChecked,onToggle,hasLink, prefixText = '',
  linkText = '', }: CheckboxRowProps) => {
  return (
      <View style={styles.row}>
      <TouchableOpacity style={styles.box} onPress={onToggle}>
        {isChecked && <Text style={styles.tick}>✓</Text>}
      </TouchableOpacity>
      {!hasLink ? (
          <Text style={styles.label}>{prefixText}</Text>
        ) 
      : (
        <View style={styles.checkBox}>
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
  checkBox:{
    flexDirection: 'row', 
    flexWrap: 'wrap' 
  },
  box: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: Colors.fieldBackground,

  },
  tick: {
    color: Colors.lightblue,
    fontSize: 14,
    fontWeight: 'bold',
  },
  label: {
    color: Colors.white,
    fontSize: 15,
  },
    link: {
    textDecorationLine: 'underline',
    color: Colors.white,
  },
})
