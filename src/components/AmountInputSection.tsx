import React, { useState, useRef, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut
} from "react-native-reanimated";

import { Images } from "../assets";
import { Colors } from "../theme/colors";

type Props = {
  amount: string;
  setAmount: (val: string) => void;
  isInsufficient: boolean;
};

const BASE_FONT_SIZE = 60;
const { width: SCREEN_WIDTH } = Dimensions.get("window");
const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);


const AmountInputSection = ({ amount, setAmount, isInsufficient }: Props) => {
  const [subAmount, setSubAmount] = useState("0.00");
  const [isSwapped, setIsSwapped] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const CONVERSION_RATE = 0.00020401;

  const fontSize = useSharedValue(BASE_FONT_SIZE);
  const inputWidth = useSharedValue(SCREEN_WIDTH * 0.35);

  useEffect(() => {
    const current = !isSwapped ? amount : subAmount;

    fontSize.value = withTiming(
      current.length > 5 ? BASE_FONT_SIZE - 15 : BASE_FONT_SIZE,
      { duration: 250 }
    );

    const baseWidth = SCREEN_WIDTH * 0.35;
    const growPerDigit = 20;
    const newWidth = Math.min(
      baseWidth + current.length * growPerDigit,
      SCREEN_WIDTH * 0.75
    );

    inputWidth.value = withTiming(newWidth, { duration: 250 });
  }, [amount, subAmount, isSwapped]);


    const inputContainerStyle = useAnimatedStyle(() => ({
      width: inputWidth.value,
    }));

  const currencyStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
    color: isInsufficient ? Colors.red : Colors.white,
  }));

  const inputStyle = useAnimatedStyle(() => ({
    fontSize: fontSize.value,
    lineHeight: fontSize.value * 1.2,
    color: isInsufficient ? Colors.red : Colors.white,
  }));

  return (
    <View style={styles.amountInputWrapper}>
      <View style={styles.amountInputBox}>
        <Animated.View style={[styles.centerInputContainer, inputContainerStyle]}>
          <Animated.Text style={[styles.currencyLabel, currencyStyle]}>
            $
          </Animated.Text>

          <Animated.View style={{ flex: 1 }}>
          <AnimatedTextInput
            ref={inputRef}
            style={[styles.amountInputField, inputStyle]}
            keyboardType="decimal-pad"
            value={!isSwapped ? amount : subAmount}
            onChangeText={(val: string) => {
              const sanitized = val.replace(/[^0-9.]/g, "");
              const parts = sanitized.split(".");
              if (parts.length > 2) return;

              if (!isSwapped) {
                setAmount(sanitized);
                const num = parseFloat(sanitized || "0");
                if (!num || num === 0) {
                  setSubAmount("0.00");   
                } else {
                  setSubAmount((num * CONVERSION_RATE).toFixed(8));
                }
              } else {
                setSubAmount(sanitized);
                const num = parseFloat(sanitized || "0");
                if (!num || num === 0) {
                  setAmount("0.00");   
                } else {
                  setAmount((num / CONVERSION_RATE).toFixed(2));
                }
              }
            }}
            selectionColor={Colors.lightblue}
            placeholder="0"
            placeholderTextColor={Colors.disabled}
            textAlign="left"
          />

          </Animated.View>
        </Animated.View>

        <TouchableOpacity
          style={styles.swapWrapper}
          onPress={() => setIsSwapped((p) => !p)}
        >
          <Image source={Images.swap} style={styles.swapIcon} />
        </TouchableOpacity>
      </View>

      <View>
        {!isSwapped ? (
        <Animated.Text
          key="subAmount"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={[
            styles.subAmount,
            { color: isInsufficient ? Colors.red : Colors.lightblue },
          ]}
        >
          {subAmount} rETH
        </Animated.Text>
        ) : (
        <Animated.Text
          key="amount"
          entering={FadeIn.duration(300)}
          exiting={FadeOut.duration(200)}
          style={[
            styles.subAmount,
            { color: isInsufficient ? Colors.red : Colors.lightblue },
          ]}
        >
          ${amount || "0"}
        </Animated.Text>
        )}
      </View>

    </View>
  );
};

export default AmountInputSection;

const styles = StyleSheet.create({
  amountInputWrapper: {
    width: "100%",
    alignItems: "center",
    marginVertical: 20,
  },
  amountInputBox: {
    width: SCREEN_WIDTH * 0.9,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 50,
    marginTop: 10
  },
  centerInputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
  },
  currencyLabel: {
    fontWeight: "700",
    includeFontPadding: false,
    fontSize: 50,
  },
  amountInputField: {
    fontWeight: "700",
    paddingVertical: 0,
    includeFontPadding: false,
    flexShrink: 1,
    minWidth: 50,
  },
  swapWrapper: {
    position: "absolute",
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 12,
  },
  swapIcon: {
    width: 22,
    height: 22,
    marginRight: 5,
    resizeMode: "contain",
    tintColor: Colors.lightblue,
  },
  subAmount: {
    fontSize: 14,
    color: Colors.lightblue,
  },
});
