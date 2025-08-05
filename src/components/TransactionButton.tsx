import { StyleSheet, Text, View, Image,TouchableOpacity, GestureResponderEvent, } from 'react-native'
import React from 'react'
import {Images} from '../assets';

interface Props{
    onPress:(event: GestureResponderEvent) => void
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
  backgroundColor: '#080C4C',
  borderWidth: 1,
  borderColor: '#030A74',
  borderRadius: 8,
  paddingHorizontal: 24,
  justifyContent: 'center',
  width: '93%', // or use Dimensions.get('window').width - 48
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
  color: '#7AB7FD',
  fontSize: 14,
},

forwardIcon: {
  tintColor: '#086DE1',
  width: 10,
  height: 9,
  resizeMode:'stretch'
},


})