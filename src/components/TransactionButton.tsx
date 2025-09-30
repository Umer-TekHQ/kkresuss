import React from 'react'
import { StyleSheet, Text, View, Image,TouchableOpacity, GestureResponderEvent, } from 'react-native'

import {Images} from '../assets';
import { Colors } from '../theme/colors';

interface Props{
    onPress?:(event: GestureResponderEvent) => void
}
const TransactionButton = ({onPress}:Props) => {
  return (
    <View>
    <TouchableOpacity
      style={styles.viewAllTxnBtn}
      onPress={onPress}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.viewAllTxnText}>View All Transactions</Text>
        <Image source={Images.forward} style={styles.forwardIcon} />
      </View>
    </TouchableOpacity>
    </View>
  )
}
export default TransactionButton

const styles = StyleSheet.create({
viewAllTxnBtn: {
  height: 50,
  backgroundColor: Colors.kresusBlue,
  borderWidth: 1,
  borderColor: Colors.background4,
  borderRadius: 8,
  paddingHorizontal: 12,
  justifyContent: 'center',
  width: '93%', 
  alignSelf: 'center',
  marginTop: 10,
  left:4,
},

innerContainer: {
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
},

viewAllTxnText: {
  color: Colors.lightblue,
  fontSize: 15,
},

forwardIcon: {
  tintColor: Colors.back,
  width: 12,
  height: 12,
  resizeMode:'stretch'
},


})