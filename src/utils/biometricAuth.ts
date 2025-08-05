import ReactNativeBiometrics from 'react-native-biometrics'

const rnBiometrics = new ReactNativeBiometrics()

export const handleBiometricAuth = async (): Promise<boolean> => {
  try {
    const result = await rnBiometrics.simplePrompt({
      promptMessage: 'Confirm fingerprint to continue',
    })

    return result.success
  } catch (error) {
    console.log('Biometric error', error)
    return false
  }
}
