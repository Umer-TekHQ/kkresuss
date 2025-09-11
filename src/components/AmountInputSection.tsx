import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, Image, StyleSheet, TouchableOpacity, Animated } from 'react-native';

import { Images } from '../assets';

import { Colors } from '../theme/colors';

type Props = {
  amount: string;
  setAmount: (val: string) => void;
  isInsufficient: boolean;
};

const AmountInputSection = ({ amount, setAmount, isInsufficient }: Props) => {
  const [subAmount, setSubAmount] = useState("0");
  const [isSwapped, setIsSwapped] = useState(false);
  const [inputWidth, setInputWidth] = useState(0);
  const dollarSignPosition = useRef(new Animated.Value(0)).current;
  const inputRef = useRef<TextInput>(null);
  const CONVERSION_RATE = 0.00020401;

  const handleInputLayout = (event: any) => {
    const { width } = event.nativeEvent.layout;
    setInputWidth(width);
  };

  useEffect(() => {
    if (inputWidth > 0) {
      const charWidth = 30; 
      const textWidth = amount.length * charWidth;
      
      const initialPosition = inputWidth / 2 - 15; 
      const newPosition = Math.max(10, initialPosition - textWidth / 2);
      
      Animated.timing(dollarSignPosition, {
        toValue: newPosition,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  }, [amount, inputWidth, dollarSignPosition]);

  return (
    <View style={styles.amountInputWrapper}>
      <View style={styles.amountInputBox}>
        {!isSwapped ? (
          <View style={styles.inputContainer} onLayout={handleInputLayout}>
            <Animated.Text
              style={[
                styles.currencyLabel,
                { 
                  color: isInsufficient ? Colors.red : Colors.white, 
                  transform: [{ translateX: dollarSignPosition }]
                },
              ]}
            >
              $
            </Animated.Text>
            <TextInput
              ref={inputRef}
              style={[
                styles.amountInputField,
                { color: isInsufficient ? Colors.red : Colors.white },
              ]}
              keyboardType="decimal-pad"
              value={amount}
              onChangeText={(val) => {
                const sanitized = val.replace(/[^0-9.]/g, '');
                const parts = sanitized.split('.');

                if (parts.length > 2) return;

                setAmount(sanitized);

                const num = parseFloat(sanitized || '0');
                setSubAmount((num * CONVERSION_RATE).toFixed(8));
              }}
            />
          </View>
        ) : (
          <TextInput
            style={[
              styles.amountInputField,
              { color: isInsufficient ? Colors.red : Colors.white, fontSize: 40, },
            ]}
            keyboardType="decimal-pad"
            value={subAmount}
            onChangeText={(val) => {
              const sanitized = val.replace(/[^0-9.]/g, '');
              const parts = sanitized.split('.');

              if (parts.length > 2) return;

              setSubAmount(sanitized);

              const num = parseFloat(sanitized || '0');
              setAmount((num / CONVERSION_RATE).toFixed(2)); 
            }}
          />
        )}

        <TouchableOpacity onPress={() => setIsSwapped((prev) => !prev)}>
          <Image source={Images.swap} style={styles.swapIcon} />
        </TouchableOpacity>
      </View>

      {!isSwapped ? (
        <Text style={styles.subAmount}>{subAmount} rETH</Text>
      ) : (
        <Text style={styles.subAmount}>${amount}</Text>
      )}
    </View>
  );
};

export default AmountInputSection;

const styles = StyleSheet.create({
  amountInputWrapper: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 20,
  },
  amountInputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    paddingHorizontal: 12,
    alignSelf: 'center',
    position: 'relative',
    height: 80,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    width: 200,
    height: 80,
    justifyContent: 'center',
  },
  currencyLabel: {
    fontWeight: 'bold',
    fontSize: 60,
    position: 'absolute',
    left: 5,
    zIndex: 2,
    marginBottom: 20,
  },
  amountInputField: {
    fontWeight: 'bold',
    textAlign: 'center',
    width: 200,
    fontSize: 60,
    paddingLeft: 60, 
  },
  swapIcon: {
    width: 18,
    height: 18,
    marginLeft: 8,
    resizeMode: 'contain',
    left: 60,
    // zIndex: 5,
    tintColor: Colors.lightblue,
  },
  subAmount: {
    fontSize: 16,
    color: Colors.white,
    marginBottom: 20,
  },
});