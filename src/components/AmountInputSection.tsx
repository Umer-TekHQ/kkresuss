import React ,{useState}from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Images } from '../assets';

type Props = {
  amount: string;
  setAmount: (val: string) => void;
  isInsufficient: boolean;
};

const AmountInputSection = ({ amount, setAmount, isInsufficient }: Props) => {
  const [subAmount, setSubAmount] = useState("1.146382610  ");
   const [isSwapped, setIsSwapped] = useState(false);
   const CONVERSION_RATE = 0.00020401; 

  return (
    <View style={styles.amountInputWrapper}>
      <View style={styles.amountInputBox}>
        <Text style={[styles.dollarSign, { color: isInsufficient ? '#FF5A5F' : '#FFFFFF',
           fontSize: isSwapped ? 40 : 60, 
         }]}>$</Text>
        <TextInput
          placeholder="0.00"
          placeholderTextColor="#7A7A7A"
          style={[styles.amountInputField, { color: isInsufficient ? '#FF5A5F' : '#FFFFFF' ,
                fontSize: isSwapped ? 40 : 60, 
          }]}
          keyboardType="decimal-pad"
          value={amount}
         // onChangeText={setAmount} 
         //multiple decimal points not allowed now
           onChangeText={(val) => {
            const sanitized = val.replace(/[^0-9.]/g, ''); 
            const parts = sanitized.split('.');

            if (parts.length > 2) {
              return; 
            }
            setAmount(sanitized);


              const num = parseFloat(sanitized || "0");
  setSubAmount((num * CONVERSION_RATE).toFixed(8)); 
          }}
   
        />
        <TouchableOpacity
          onPress={() => {
          const currentAmount = amount;
          const currentSub = subAmount;
          setAmount(currentSub);
          setSubAmount(currentAmount);
          setIsSwapped((prev) => !prev); 
        }}
        >
        <Image source={Images.swap} style={styles.swapIcon} />
        </TouchableOpacity>
      </View>
       {!isSwapped ? (
      <Text style={styles.subAmount}
      >{subAmount}<Text>rETH</Text></Text>
       ):(
      <Text style={styles.subAmount}>
          {subAmount}
      </Text>
       )}
    </View>
  );
};

export default AmountInputSection;

const styles = StyleSheet.create({
  amountInputWrapper: {
    width: '100%',
    alignItems: 'center',
  },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
   // paddingVertical: 8,
    //marginVertical: 12,
    alignSelf: 'center',
    position: 'relative',
   
  },
  dollarSign: {
    //fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
  amountInputField: {
   // fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'left',
    width: 140,
    
  },
  swapIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    resizeMode: 'contain',
    left: 75,
    tintColor:'#ADD2FD'
   // top: 5,
  },
  subAmount: {
    fontSize: 14,
    color: '#FF5A5F',
    //right: 10,
    bottom:10, // as per qa
   marginBottom:20,
  },
});
