import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Images } from '../assets';

type Props = {
  amount: string;
  setAmount: (val: string) => void;
  isInsufficient: boolean;
};

const AmountInputSection = ({ amount, setAmount, isInsufficient }: Props) => {
  const [subAmount, setSubAmount] = useState('0');
  const [isSwapped, setIsSwapped] = useState(false);
  const CONVERSION_RATE = 0.00020401;

  const animatedFontSize = useRef(new Animated.Value(60)).current;
  const animatedMarginLeft = useRef(new Animated.Value(0)).current; 

  const handleChange = (val: string) => {
    const sanitized = val.replace(/[^0-9.]/g, '');
    const parts = sanitized.split('.');
    if (parts.length > 2) return;

    setAmount(sanitized);

    const num = parseFloat(sanitized || '0');
    setSubAmount((num * CONVERSION_RATE).toFixed(8));

    const newFontSize = sanitized.length > 4 ? 40 : 60;
    const shiftLeft = sanitized.length > 4 ? (sanitized.length - 4) * 10 : 0;

    Animated.timing(animatedFontSize, {
      toValue: newFontSize,
      duration: 200,
      useNativeDriver: false,
    }).start();

    Animated.timing(animatedMarginLeft, {
      toValue: shiftLeft,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

  return (
    <View style={styles.amountInputWrapper}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <View style={styles.amountInputBox}>
          <Animated.Text
            style={[
              styles.dollarSign,
              {
                color: isInsufficient ? '#FF5A5F' : '#FFFFFF',
                fontSize: animatedFontSize,
              },
            ]}
          >
            $
          </Animated.Text>

          <AnimatedTextInput
            style={[
              styles.amountInputField,
              {
                color: isInsufficient ? '#FF5A5F' : '#FFFFFF',
                fontSize: animatedFontSize,
                marginLeft: -animatedMarginLeft, 
              },
            ]}
            keyboardType="decimal-pad"
            value={amount}
            onChangeText={handleChange}
          />
        </View>

        <TouchableOpacity
          onPress={() => {
            const currentAmount = amount;
            const currentSub = subAmount;
            setAmount(currentSub);
            setSubAmount(currentAmount);
            setIsSwapped(prev => !prev);
          }}
          // hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
         <Image source={Images.swap} style={styles.swapIcon} /> 
        </TouchableOpacity>
      </View>

      {!isSwapped ? (
        <Text style={styles.subAmount}>
          {subAmount}
          <Text> rETH</Text>
        </Text>
      ) : (
        <Text style={styles.subAmount}>{subAmount}</Text>
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
    justifyContent: 'flex-end', 
    borderRadius: 10,
    paddingHorizontal: 12,
    marginLeft: 55,
    alignSelf: 'center',
    position: 'relative',
  },
  dollarSign: {
    fontWeight: 'bold',
    textAlign: 'center',
  },
  amountInputField: {
    fontWeight: 'bold',
    // textAlign: 'right', 
    width: 140,
  },
  swapIcon: {
    width: 22,
    height: 22,
    marginLeft: 12,
    resizeMode: 'contain',
    // left: 60,
    zIndex: 5,
    tintColor: '#ADD2FD',
  },
  subAmount: {
    fontSize: 14,
    color: '#FF5A5F',
    bottom: 10,
    marginBottom: 20,
  },
});
