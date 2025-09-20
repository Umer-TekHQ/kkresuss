import React from "react";
import TokenField from "../components/tokenField";
import type { Token } from "../screens/Trade/types";

interface Props {
  token: Token | null;
  amount: string;
  onAmountChange: (text: string) => void;
  onPress: () => void;
  editable: boolean;
  hasError: boolean;
  field: "token1" | "token2";
  isUSD: boolean;
  tokenRates: Record<string, number>;
}

const TradeTokenInput = ({
  token,
  amount,
  onAmountChange,
  onPress,
  editable,
  hasError,
  field,
  isUSD,
  tokenRates,
}: Props) => (
  <TokenField
    token={token}
    amount={amount}
    onAmountChange={onAmountChange}
    onPress={onPress}
    editable={editable}
    hasError={hasError}
    field={field}
    isUSD={isUSD}
    tokenRates={tokenRates}
  />
);

export default TradeTokenInput;
