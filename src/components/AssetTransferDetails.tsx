import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { Images } from '../assets'

type Props = {
  logo: any
  name: string
  short: string
  price: number
  amount: number;
  note: string;

}


const AssetTransferDetails = ({ logo, name, short,note,amount }: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.divider} />

      <View style={styles.assetRow}>
        <Image source={logo} style={styles.logo} />
        <View style={styles.assetTextContainer}>
          <Text style={styles.assetName}>{name}</Text>
          <Text style={styles.subText}>1 {short} = $3,450.00</Text>
        </View>
        <View style={styles.rightColumn}>
          <Text style={styles.amount}>${amount}</Text>
          <Text style={styles.shortAmount}>0.11020060</Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.infoRow}>
  <Text style={styles.label}>Address</Text>
  <View style={styles.addressContainer}>
    <Text style={styles.infoText}>
      0x39ac21b9e9846edfdc6f3e26d44c9237ac3d54a491731
    </Text>
  </View>
</View>


      <View style={styles.divider} />

      <View style={styles.infoRowSecond}>
        <Text style={styles.label}>Note to self</Text>
        <Text style={styles.infosubText}>{note}</Text>
      </View>
    </View>
  )
}

export default AssetTransferDetails

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  assetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  assetTextContainer: {
    flexDirection: 'column',
  },
  rightColumn: {
    position: 'absolute',
    right: 0,
    alignItems: 'flex-end',
  },
  assetName: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  subText: {
    fontSize: 13,
    color: '#ADD2FD',
  },
  amount: {
    fontSize: 19,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  shortAmount: {
    fontSize: 13,
    color: '#ADD2FD',
  },
  divider: {
    height: 1,
    backgroundColor: '#10178A',
    marginVertical: 8,
  },
  infoRow: {
    marginBottom: 15,
    flexDirection:'row',
    alignItems: 'flex-start',
   
  },
  infoRowSecond:{
  marginBottom: 15,
    
  },
  label: {
    fontSize: 15,
    color: '#ADD2FD',
    marginBottom: 4,
  },
  infoText: {
    fontSize: 15,
    color: '#ADD2FD',
    flexWrap: 'wrap',
  lineHeight: 20,

  },
  addressContainer: {
  flex: 1,
  marginLeft: 90,
},

  infosubText:{
    color:'white',
    fontSize:15,
   // paddingRight:20,
  }
})