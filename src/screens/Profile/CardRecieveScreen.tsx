import { Image, StyleSheet, Text, TouchableOpacity, View, Dimensions } from 'react-native'
import React from 'react'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useNavigation } from '@react-navigation/native'
import { Images } from '../../assets'
import ProfileCard from '../../components/ProfileCards'
import { BottomSheetUnified } from '../../components/BottomSheet' 
import { useSharedValue } from 'react-native-reanimated'

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function CardRecieveScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const translateY = useSharedValue(0);
  const cards = [
      {
        icon: Images.solanalogo,
        title: 'Solana Wallet Address',
        address: 'dDCQNn...c7c8',
        background: Images.solanabg,
      },
    ];
  return (
    <View style={styles.container}>
      <View style={{flexDirection: 'row', alignItems: 'center',}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image 
            source={Images.backarrow}
            style={[styles.backarrow, { width: screenWidth * 0.035, height: screenWidth * 0.035,  }]}
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
          source={Images.qr1}
          style={{
            width: screenWidth * 0.55,
            height: screenWidth * 0.55,
            resizeMode: 'contain'
          }}
        />
      </View>
      <BottomSheetUnified screen="profile" translateY={translateY} />
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
    fontSize: 22,
  },
  backarrow:{
    marginLeft: 12,
  },
  card:{
    display: 'flex',
    alignItems: 'center',
  },
  qr:{
    alignItems: 'center'
  },
})