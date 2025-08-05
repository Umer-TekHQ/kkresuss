import React from 'react';
import { View, Text, TextInput, Image, StyleSheet } from 'react-native';
import { Images } from '../assets';

type Props = {
  amount: string;
  setAmount: (val: string) => void;
  isInsufficient: boolean;
};

const AmountInputSection = ({ amount, setAmount, isInsufficient }: Props) => {
  return (
    <View style={styles.amountInputWrapper}>
      <View style={styles.amountInputBox}>
        <Text style={[styles.dollarSign, { color: isInsufficient ? '#FF5A5F' : '#FFFFFF' }]}>$</Text>
        <TextInput
          placeholder="0.00"
          placeholderTextColor="#7A7A7A"
          style={[styles.amountInputField, { color: isInsufficient ? '#FF5A5F' : '#FFFFFF' }]}
          keyboardType="decimal-pad"
          value={amount}
          onChangeText={setAmount}
        />
        <Image source={Images.swap} style={styles.swapIcon} />
      </View>
      <Text style={styles.subAmount}>1.146382610 rETH</Text>
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
    paddingVertical: 8,
    marginVertical: 12,
    alignSelf: 'center',
    position: 'relative',
  },
  dollarSign: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
   
  },
  amountInputField: {
    fontSize: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    width: 140,
  },
  swapIcon: {
    width: 14,
    height: 14,
    marginLeft: 8,
    resizeMode: 'contain',
    left: 80,
    top: 10,
  },
  subAmount: {
    fontSize: 14,
    color: '#FF5A5F',
    right: 10,
  },
});
