import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useState } from 'react'
import { View, Text, StyleSheet, Image,TouchableOpacity } from 'react-native'
import { Colors } from '../../theme/colors'
import { useSelector } from 'react-redux'

import { Images } from '../../assets'
import AppHeader from '../../components/AppHeader'
import LabeledPhoneInput from '../../components/LabeledPhoneInput'
import SecondaryButton from '../../components/SecondaryButton'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { RootState } from '../../store' 

const RecoveryAnd2FAScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const email = useSelector((state: RootState) => state.user.email)

  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('+1')

  return (
    <View style={styles.container}>
      <AppHeader title="Recovery and 2FA" />
      <View style={styles.subContainer}>
 <View style={styles.dividerTwo} />
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
        <Image source={Images.pros} style={styles.identityIcon} />
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
    backgroundColor: Colors.backgroundAlt,
  },
  subContainer:{
 paddingHorizontal: 18,
  },
  section: {
    marginTop: 20,
  },
  label: {
    fontSize: 15,
    color: Colors.lightblue,
    marginBottom: 8,
    height: 22,
  },
  emailText: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '500',
  },
  verified: {
    color: Colors.transaction,
    fontSize: 13,
    marginTop: 4,
    marginBottom:8
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background4,
    marginVertical: 20,
  },
  sectionTitle: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '500',
    marginBottom: 0,
  },
  sectionDescription: {
    color: Colors.lightblue,
    fontSize: 15,
  },
  advancedRow: {
     flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  globalLabel: {
    color: Colors.white,
    fontSize: 19,
    fontWeight: '500',
  },
  globalDesc: {
    color: Colors.lightblue,
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
  width: 30,
  height: 30,
 resizeMode:'cover',
  tintColor: Colors.lightblue,
},
dividerTwo:{
  height: 0.5,
  backgroundColor: Colors.background4,
},
textWrapper: {
  flex: 1,
},




})

