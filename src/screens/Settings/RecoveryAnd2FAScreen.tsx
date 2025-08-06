import { Images } from '../../assets'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import AppHeader from '../../components/AppHeader'
import SecondaryButton from '../../components/SecondaryButton'
import LabeledPhoneInput from '../../components/LabeledPhoneInput'
import { useSelector } from 'react-redux'
import { RootState } from '../../store' 

const RecoveryAnd2FAScreen = () => {
  const email = useSelector((state: RootState) => state.user.email)

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('+92')

  return (
    <View style={styles.container}>
      <AppHeader title="Recovery and 2FA" />

      <View style={styles.section}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.emailText}>{email}</Text>
        <Text style={styles.verified}>✔ Email address verified</Text>
      </View>

      <View style={styles.divider} />

      <LabeledPhoneInput
        label="Recovery Phone"
        code={code}
        onCodeChange={setCode}
        phone={phone}
        onPhoneChange={setPhone}
        showWarning
      />

      <View style={styles.divider} />

      <View style={styles.titleWithIcon}>
        <Text style={styles.sectionTitle}>Advanced Verification</Text>
        <Image source={Images.identity} style={styles.identityIcon} />
      </View>

      <Text style={styles.sectionDescription}>
        Should you lose access to your email or device, ensure you are able to recover your account with
        device-independent 3D facial authentication.
      </Text>

      <View style={styles.advancedRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.globalLabel}>Global Verification</Text>
          <Text style={styles.globalDesc}>Facial authentication with international coverage.</Text>
        </View>
        <SecondaryButton label="+ Add" />
      </View>
    </View>
  )
}

export default RecoveryAnd2FAScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010D2A',
    paddingHorizontal: 20,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    color: '#A6A6C3',
    marginBottom: 8,
    height: 22,
  },
  emailText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '500',
  },
  verified: {
    color: '#44D26D',
    fontSize: 13,
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#1B2A52',
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 15.5,
    fontWeight: '500',
    marginBottom: 6,
  },
  sectionDescription: {
    color: '#ADD2FD',
    fontSize: 13,
    marginBottom: 20,
  },
  advancedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  globalLabel: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  globalDesc: {
    color: '#ADD2FD',
    fontSize: 13,
    marginTop: 2,
  },titleWithIcon: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 6,
},
identityIcon: {
  width: 20,
  height: 20,
 
  tintColor: 'white',
},

})

