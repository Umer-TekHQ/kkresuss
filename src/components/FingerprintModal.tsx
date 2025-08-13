import React from 'react'
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native'
import AppButton from './AppButton'
import SecondaryButton from './SecondaryButton'
import { Images } from '../assets'

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
          <Image source={Images.iconcircle} style={styles.iconImg} resizeMode="contain" />
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
    marginTop: height * 0.09, //0.14 was actual 
  },
  modalBox: {
    width: 343,
    height: 411, //actual 441 hai 
    backgroundColor: '#10178A',
    borderRadius: 20,
    borderTopWidth: 1,
    borderColor: '#0734A9',
    alignItems: 'center',
    paddingTop: 20,
    paddingHorizontal: 35,
    paddingBottom: 20,
  },
  logoWrapper: {
    width: 71,
    height: 71,
    borderWidth: 1,
    borderColor: '#0734A9',
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
    color: '#FFFFFF',
    fontSize: 30,
    fontWeight: '600',
   //paddingTop:2, //actual was 10
   marginBottom:2,
  },
  subText: {
    marginTop:-25, //-45 tha
    fontSize: 19,
    color: '#ADD2FD',
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