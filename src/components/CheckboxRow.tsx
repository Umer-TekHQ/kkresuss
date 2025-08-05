import React, { useState } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'

export type CheckboxRowProps = {
  label: string
  isChecked: boolean
  onToggle: () => void
}


const CheckboxRow = ({ label,isChecked,onToggle }: CheckboxRowProps) => {
  const [checked, setChecked] = useState(false)

  return (
    <TouchableOpacity style={styles.row} onPress={() => setChecked(!checked)}>
      <View style={styles.box}>
        {checked && <Text style={styles.tick}>✓</Text>}
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
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
    borderColor: '#ADD2FD',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    backgroundColor: 'transparent',
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
})
