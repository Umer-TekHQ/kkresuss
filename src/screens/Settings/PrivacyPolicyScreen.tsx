
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



      <ScrollView contentContainerStyle={styles.content}>
      
        <View style={styles.topSection}>
          <View style={styles.logoRow}>
            <Image source={Images.logo} style={styles.logo} />
            <Text style={styles.kresus}>Kresus</Text>
          </View>

          <Text style={styles.privacyTitle}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last modified: February 20, 2024</Text>
        </View>

      
        <View style={styles.whiteSection}>
          <Text style={styles.sectionTitle}>Introduction</Text>
          <Text style={styles.bodyText}>
            Kresus Labs, Inc. (“Kresus” or “We”) respect your privacy and are committed to protecting it. This Privacy
            Policy (the “Policy”) describes the types of Personal Data we may collect or that you may provide in
            connection with your access or use the Kresus website, kresus.com (the “Website”), the Kresus SuperApp (the
            “App”) and any other websites or apps that link to this Policy (jointly, the “Services”) and how we process
            your Personal Data.
          </Text>
          <Text style={styles.bodyText}>
            This Policy also explains your rights and choices about how we use your Personal Data, including how you can
            access or update certain information about you. Beyond the Privacy Policy, your use of our Services and
            Website is also subject to our Terms and Conditions.
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default PrivacyPolicyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#010D2A',
  },
  content: {
    paddingBottom: 40,
  },

  topSection: {
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#010D2A',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
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
    color: '#ADD2FD',
    fontSize: 13,
    marginBottom: 16,
  },
  whiteSection: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 40,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
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
})
