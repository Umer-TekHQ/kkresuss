import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'

import AppButton from './AppButton'
import SecondaryButton from './SecondaryButton'
import { Images } from '../assets'
import { Colors } from '../theme/colors'

const { width, height } = Dimensions.get('window')

interface Props {
  onContinue: () => void
  onGoBack: () => void
}

const FingerprintModal = ({ onContinue, onGoBack }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalBox}>
        <View style={styles.logoWrapper}>
          <Image source={Images.iconCircle} style={styles.iconImg} resizeMode="contain" />
        </View>

        <View style={styles.contentWrapper}>
          <Text style={styles.faceIdText}>Face ID</Text>
          <Text style={styles.subText}>
            Use your device’s Face ID for a more secure and convenient login experience.
          </Text>

          <View style={styles.btnWrapper}>
            <View style={styles.actionBtn}>
              <AppButton label="Activate" onPress={onContinue} width={width * 0.8} />
            </View>

            <View style={styles.secondaryBtn}>
              <SecondaryButton label="Maybe Later" onPress={onGoBack} />
            </View>
          </View>
        </View>
      </View>
    </View>
  )
}

export default FingerprintModal

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginTop: height * 0.09, 
  },
  modalBox: {
    width: 343,
    height: 411, 
    backgroundColor: Colors.background1,
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: Colors.background4,
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 20,
  },
  logoWrapper: {
    width: 71,
    height: 71,
    borderWidth: 1,
    borderColor: Colors.fieldBorder,
    borderRadius: 99,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  iconImg: {
    width: 71,
    height: 71,
  },
  contentWrapper: {
    alignItems: 'center',
    gap: 10,
    paddingVertical: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  faceIdText: {
    color: Colors.white,
    fontSize: 30,
   marginBottom:2,
   fontFamily: 'PlayfairDisplay-Bold', 

  },
  subText: {
    marginTop:-25, 
    fontSize: 19,
    color: Colors.lightblue,
    textAlign: 'center',
    maxWidth: 280,
    lineHeight: 20,
  },
  btnWrapper: {
    width: '100%',
    alignItems: 'center',
    gap: 14,
    marginTop: 50,
  },
  actionBtn: {
    width: 'auto', 
  },
  secondaryBtn: {
    width: 125,
    height: 45,
  },
})