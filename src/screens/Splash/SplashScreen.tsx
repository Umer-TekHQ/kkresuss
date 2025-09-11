import React, { useEffect ,useState } from 'react'
import { View } from 'react-native'

import Background from '../../components/Background'
import SplashScreenStyles from '../../styles/SplashScreen.styles'

export const SplashScreen = ({navigation}:any) => {
  const [showContent, setShowContent] = useState(false)
useEffect(() => {
  const timer = setTimeout(() => {
    setShowContent(true)
    setTimeout(() => {
      navigation.navigate('Welcome')
    },1000) 
  }, 3000)
  return () => clearTimeout(timer)
}, [])
  return (
    <View  style={SplashScreenStyles.container}> 
      <Background showContent={showContent} />
    </View>
  )
}
