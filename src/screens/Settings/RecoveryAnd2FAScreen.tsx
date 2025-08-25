import { Images } from '../../assets'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import AppHeader from '../../components/AppHeader'
import SecondaryButton from '../../components/SecondaryButton'
import LabeledPhoneInput from '../../components/LabeledPhoneInput'
import { useSelector } from 'react-redux'
import { RootState } from '../../store' 
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'

const RecoveryAnd2FAScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const email = useSelector((state: RootState) => state.user.email)

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('+1')

  return (
    <View style={styles.container}>
      <AppHeader title="Recovery and 2FA" />
      <View style={styles.subcontainer}>
 <View style={styles.dividertwo} />
      <View style={styles.section}>
        <Text style={styles.label}>Email </Text>
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

  
<View style={styles.titleWithIcon}>     
     <TouchableOpacity  
       onPress={() => navigation.navigate('Verification')}
        activeOpacity={0.7}>
        <Text style={styles.sectionTitle}>Advanced Verification</Text>
     </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Verification')}>
        <Image source={Images.identity} style={styles.identityIcon} />
      </TouchableOpacity>
</View>

      <Text style={styles.sectionDescription}>
        Should you lose access to your email or device, ensure you are able to recover your account with
        device-independent 3D facial authentication.
      </Text>
 <View style={styles.divider} />
      <View style={styles.advancedRow}>
        <View style={styles.textWrapper}>
          <Text style={styles.globalLabel}>Global Verification</Text>
          <Text style={styles.globalDesc}>Facial authentication with international coverage.</Text>
        </View>
           
            <SecondaryButton label="+ Add" />
      </View>
      </View>
      </View>
  )
}

export default RecoveryAnd2FAScreen


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010D2A',
  },
  subcontainer:{
 paddingHorizontal: 18,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    color: '#ADD2FD',
    marginBottom: 8,
    height: 22,
  },
  emailText: {
    color: '#ffffff',
    fontSize: 19,
    fontWeight: '500',
  },
  verified: {
    color: '#44D26D',
    fontSize: 13,
    marginTop: 4,
    marginBottom:8
  },
  divider: {
    height: 1,
    backgroundColor: '#030A74',
    marginVertical: 20,
  },
  sectionTitle: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',
    marginBottom: 0,
  },
  sectionDescription: {
    color: '#ADD2FD',
    fontSize: 15,
  // marginBottom: 20,
  },
  advancedRow: {
  
     flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  },
  globalLabel: {
    color: 'white',
    fontSize: 19,
    fontWeight: '500',

  },
  globalDesc: {
    color: '#ADD2FD',
    fontSize: 15,
    marginTop: 2,
  },
  titleWithIcon: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  marginBottom: 6,
  marginTop:40,
},
identityIcon: {
  width: 20,
  height: 20,
 resizeMode:'cover',
  tintColor: '#ADD2FD',
},dividertwo:{
 height: 0.5,
    backgroundColor: '#030A74',
},
textWrapper: {
  flex: 1,
},




})

