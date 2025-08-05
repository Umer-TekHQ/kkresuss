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
          <Image source={Images.downarrow} style={styles.downIcon} />
        </TouchableOpacity>

        <TextInput
          style={styles.phoneInput}
          placeholder="Enter Phone"
          placeholderTextColor="#7C8CAA"
          value={phone}
          onChangeText={onPhoneChange}
          keyboardType="phone-pad"
        />
      </View>

      {/* Warning Message */}
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
    color: '#A6A6C3',
    marginBottom: 8,
    height: 22,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1B2A52',
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 45,
  },
  codePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  codeText: {
    color: 'white',
    fontSize: 15,
    marginRight: 4,
  },
  downIcon: {
    width: 12,
    height: 12,
    resizeMode:'contain',
    tintColor: 'white',
  },
  phoneInput: {
    flex: 1,
    color: 'white',
    fontSize: 15,
 
  },
  warningText: {
    color: '#FF6565',
    fontSize: 12,
    marginTop: 6,
  },
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modal: {
    backgroundColor: '#0E1B36',
    padding: 20,
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
  },
  option: {
    paddingVertical: 14,
  },
  optionText: {
    color: 'white',
    fontSize: 16,
  },
})
