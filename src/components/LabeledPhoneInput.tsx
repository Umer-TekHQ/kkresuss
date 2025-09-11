import React, { useState } from 'react'
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  Modal,
  FlatList,
} from 'react-native'

import { Images } from '../assets'

import { Colors } from '../theme/colors'

interface Props {
  label: string
  phone: string
  onPhoneChange: (val: string) => void
  code: string
  onCodeChange: (val: string) => void
  showWarning?: boolean
}
const countryCodes = ['+1', '+91', '+92']
const LabeledPhoneInput = ({
  label,
  phone,
  onPhoneChange,
  code,
  onCodeChange,
  showWarning,
}: Props) => {
  const [modalVisible, setModalVisible] = useState(false)
  return (
    <View style={{ marginBottom: 10 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputWrapper}>
        <TouchableOpacity
          style={styles.codePicker}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.codeText}>{code}</Text>
          <Image source={Images.downArrow} style={styles.downIcon} />
        </TouchableOpacity>

<View style={styles.separator} />

        <TextInput
          style={styles.phoneInput}
          placeholder="Enter Phone"
          placeholderTextColor="#FFFFFF"
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
        />
      </View>

    
      {showWarning && phone.trim() === '' && (
        <Text style={styles.warningText}>
          Without a phone number, you will not be able to recover your account if you lose access to your email.
        </Text>
      )}

     
      <Modal visible={modalVisible} transparent animationType="fade">
        <TouchableOpacity
          style={styles.overlay}
          onPress={() => setModalVisible(false)}
          activeOpacity={1}
        >
          <View style={styles.modal}>
            <FlatList
              data={countryCodes}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => {
                    onCodeChange(item)
                    setModalVisible(false)
                  }}
                >
                  <Text style={styles.optionText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  )
}

export default LabeledPhoneInput

const styles = StyleSheet.create({
  label: {
    fontSize: 15,
    color: Colors.lightblue,
    marginBottom: 8,
    height: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    borderRadius: 12,
    paddingHorizontal: 10,
    height: 65,
  },
  codePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  codeText: {
    color: Colors.white,
    fontSize: 19,
    marginRight: 10,
  },
  downIcon: {
    width: 12,
    height: 12,
    resizeMode:'contain',
    tintColor: Colors.back,
  },
  phoneInput: {
    flex: 1,
    color: 'white',
    fontSize: 19,
 
  },
  warningText: {
    color: Colors.red,
    fontSize: 13,
    marginTop: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: Colors.dim,
  },
  modal: {
    backgroundColor: Colors.background,
    padding: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  option: {
    paddingVertical: 14,
  },
  optionText: {
    color: Colors.white,
    fontSize: 16,
  },
  separator: {
  width: 1,
  height: '100%', 
  backgroundColor: Colors.fieldBorder,
  marginHorizontal: 8,
},

})
