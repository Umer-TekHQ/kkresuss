import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'

import { Images } from '../../assets'
import BottomSheetProfile from '../../components/BottomSheetProfile'
import ProfileCard from '../../components/ProfileCards'
import { AppNavigatorParamList } from '../../navigators/routeNames'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function BaseReceiveScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const cards = [
      {
        icon: Images.baseCardLogo,
        title: 'Base Wallet Address',
        address: 'dDCQNn...c7c8',
        background: Images.baseBg,
      },
    ];
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={Images.backButton}
            style={[styles.backArrow, { width: screenWidth * 0.08, height: screenWidth * 0.08,  }]}
          />
        </TouchableOpacity>
        <View style={{flex: 1, marginLeft: screenWidth * 0.23}}>
        <Text style={styles.head1}>
          Receive on Base
        </Text>
        </View>
      </View>
      <View style={[styles.card, { marginTop: screenHeight * 0.07 }]}>
        <View>
          {cards.map((card, index) => (
            <ProfileCard key={index} {...card}  />
          ))}
        </View>
      </View>
      <View style={[styles.qr, { marginTop: screenHeight * 0.04 }]}>
        <Image
          source={Images.qr}
          style={{
            width: screenWidth * 0.55,
            height: screenWidth * 0.55,
            resizeMode: 'contain'
          }}
        />
      </View>
      <BottomSheetProfile navigation={navigation}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#000',
    paddingTop: 20,

  },
  head1:{
    color: 'white',
    alignItems: 'center',
    fontSize: 18,
  },
  backArrow:{
    marginLeft: 15,
  },
  card:{
    display: 'flex',
    alignItems: 'center',
  },
  qr:{
    alignItems: 'center'
  },
})