import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useRef } from "react";
import { ScrollView, Alert, View, Text, StyleSheet } from "react-native";

import { Token } from "./types";
import ArrowDivider from "../../components/arrowDivider";
import BottomSheetTrade, { BottomSheetTradeRef } from "../../components/BottomSheetTrade";
import { HeaderNav } from "../../components/HeaderNav";
import TradeFooter from "../../components/tradeFooter";
import TradeHeaderRow from "../../components/tradeHeaderRow";
import { AppNavigatorParamList } from "../../navigators/routeNames";
import { useAppSelector, useAppDispatch } from "../../store/hooks";
import { setToken2 } from "../../store/slices/tradeSlice";
import { Colors } from "../../theme/colors";
import TradeTokenInput from "../../components/tradeTokenInput";
import { useTradeLogic } from "../../components/useTradeLogic";

export const TradeScreen = () => {
  const dispatch = useAppDispatch();
  const { token1, token2, amount1, amount2, isUSD } = useAppSelector((s) => s.trade);
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const tradeSheetRef = useRef<BottomSheetTradeRef>(null);

  const tokenRates: Record<string, number> = {
    NORMIE: 0.001733, SNORT: 0.000502, USDC: 1, rETH: 4915.27, AERO: 495.27,
    BRETT: 0.0576, TOSHI: 0.052976, BSHIB: 0, cbETH: 0.000209561,
    MOCHI: 66497700, ADA: 49536.1, XPR: 49536.1,
  };

  const { errors, handleToggleUSD, handleAmount1Change, handleAmount2Change, validateFields } =
    useTradeLogic(tokenRates, token1, token2, isUSD);

  const handleContinue = () => {
    if (!validateFields(amount1, amount2)) {
      Alert.alert("Incomplete Information", "Please select both tokens and enter valid amounts.");
      return;
    }
    if (token1?.abbreviation === token2?.abbreviation) {
      Alert.alert("Invalid Selection", "Trade and Receive tokens cannot be the same.");
      return;
    }
    tradeSheetRef.current?.openSheet();
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <HeaderNav />
        <TradeHeaderRow isUSD={isUSD} amount1={amount1} onToggleUSD={handleToggleUSD} />
        <TradeTokenInput
          token={token1}
          amount={amount1}
          onAmountChange={handleAmount1Change}
          onPress={() =>
            navigation.navigate("SearchScreen", { field: "token1", excludeToken: token2?.abbreviation })
          }
          editable
          hasError={errors.token1 || errors.amount1}
          field="token1"
          isUSD={isUSD}
          tokenRates={tokenRates}
        />
        <ArrowDivider />
        <Text style={styles.title2}>Receive</Text>
        <TradeTokenInput
          token={token2}
          amount={amount2}
          onAmountChange={handleAmount2Change}
          onPress={() =>
            navigation.navigate("ReceiveTokenScreen", {
              field: "token2",
              excludeToken: token1?.abbreviation,
              onSelectToken: (t: Token) => {
                if (t.abbreviation === token1?.abbreviation) return;
                dispatch(setToken2(t));
              },
            })
          }
          editable={false}
          hasError={errors.token2 || errors.amount2}
          field="token2"
          isUSD={isUSD}
          tokenRates={tokenRates}
        />
        <TradeFooter
          onContinue={handleContinue}
          isEnabled={Boolean(token1 && token2 && amount1 && amount2 && amount1 !== "0" && amount2 !== "0")}
        />
        <BottomSheetTrade ref={tradeSheetRef} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background5 },
  content: { flexGrow: 1 },
  title2: { color: Colors.white, fontSize: 19, marginLeft: 12, marginBottom: 8 },
});
