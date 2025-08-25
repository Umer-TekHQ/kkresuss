
import React from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native'
import AppHeader from '../../components/AppHeader'
import { Images } from '../../assets'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'

const PrivacyPolicyScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()

 

  return (
    <View style={styles.container}>
    
    <View style={styles.customHeader}>
  <View style={styles.leftIcons}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Image source={Images.backscreen} style={styles.headerIcon} />
    </TouchableOpacity>
    <TouchableOpacity>
      <Image source={Images.refresh} style={[styles.headerIcon, { marginLeft: 10 }]} />
    </TouchableOpacity>
  </View>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <Image source={Images.whitecross} style={styles.headerIcon} />
  </TouchableOpacity>
</View>
      
        <View style={styles.topSection}>
          
    
          <View style={styles.logoRow}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image source={Images.logo} style={styles.logo} />
            <Text style={styles.kresus}>Kresus</Text>
          </View>
          <TouchableOpacity>
            {/* <Image source={Images.hamburgerbg} style={styles.hamburgerIcon} /> */}
          </TouchableOpacity>
        </View>


          <Text style={styles.privacyTitle}>Privacy Policy</Text>
           <Text style={styles.lastUpdated}></Text> 
        </View>

      
        <View style={styles.whiteSection}>
  <Text style={styles.lastUpdated}>Last modified: February 20, 2024</Text>

          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.bodyText}>
            Kresus Labs, Inc. (“Kresus” or “We”) respect your privacy and are committed to protecting it. This Privacy
            Policy (the “Policy”) describes the types of Personal Data we may collect or that you may provide in
            connection with your access or use the Kresus website, kresus.com (the “Website”), the Kresus SuperApp (the
            “App”) and any other websites or apps that link to this Policy (jointly, the “Services”) and how we process
            your Personal Data. This Policy also explains your rights and choices about how we use your Personal Data, including how you can
            access or update certain information about you. Beyond the Privacy Policy, your use of our Services and
            Website is also subject to our<TouchableOpacity><Text style={{color:'#ADD2FD', fontWeight:'bold', top:5}}> Terms and Conditions.</Text></TouchableOpacity>
          </Text>
        </View>
    </View>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070942',
  },
  content: {
    paddingBottom: 40,
  },

  topSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#070942',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginLeft: -10,// to make more good 
  },
  logo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
    marginRight: 10,
  },
  kresus: {
    color: 'white',
    fontSize: 22,
    fontWeight: '700',
  },
  privacyTitle: {
    color: 'white',
    fontSize: 28,
    fontWeight: '800',
    marginTop: 18,
    marginBottom: 6,
  },
  lastUpdated: {
    color: 'black',
    fontSize: 13,
    fontWeight:'500',
    marginBottom: 16,
  },
  whiteSection: {
      flex: 1, // add this
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    textDecorationLine:'underline'
  },
  bodyText: {
    color: 'black',
    fontSize: 14,
    lineHeight: 22,
    marginBottom: 12,
  },
   customHeader: {
    height: 65,
    backgroundColor: '#080C4C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  headerIcon: {
  //  height: 13,
  //  width: 13,
   // resizeMode: 'contain',

  },
   leftIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hamburgerIcon:{
   // backgroundColor:'transparent'
   width:100,
   height:100,
   tintColor:'blue'
  }
})
