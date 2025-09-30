import { useState } from "react";

import { useAppDispatch } from "../store/hooks";
import { setAmount1, setAmount2, toggleUSD } from "../store/slices/tradeSlice";

export const useTradeLogic = (tokenRates: Record<string, number>, token1: any, token2: any, isUSD: boolean) => {
  const dispatch = useAppDispatch();
  const [errors, setErrors] = useState({ token1: false, token2: false, amount1: false, amount2: false });

  const sanitizeInput = (text: string) => {
    const cleaned = text.replace(/[^0-9.]/g, "");
    const parts = cleaned.split(".");
    if (parts.length > 2) return parts[0] + "." + parts[1];
    return cleaned;
  };

  const formatToSix = (num: number) => parseFloat(num.toFixed(6)).toString();

  const handleToggleUSD = () => {
    if (!token1 || !token2) return;
    dispatch(toggleUSD());
  };

  const handleAmount1Change = (text: string) => {
    const safeText = sanitizeInput(text);
    if (!token1 || !token2) {
      dispatch(setAmount1(safeText));
      return;
    }

    const amountNum = parseFloat(safeText) || 0;

    if (isUSD) {
      const tokenAmount = amountNum / tokenRates[token1.abbreviation];
      const converted = (tokenAmount * tokenRates[token1.abbreviation]) / tokenRates[token2.abbreviation];
      dispatch(setAmount1(formatToSix(tokenAmount)));
      dispatch(setAmount2(formatToSix(converted)));
    } else {
      const usdValue = amountNum * tokenRates[token1.abbreviation];
      const converted = usdValue / tokenRates[token2.abbreviation];
      dispatch(setAmount1(safeText));
      dispatch(setAmount2(formatToSix(converted)));
    }
  };

  const handleAmount2Change = (text: string) => {
    const safeText = sanitizeInput(text);
    if (!token1 || !token2) return;

    const amountNum = parseFloat(safeText) || 0;
    const usdValue = amountNum * tokenRates[token2.abbreviation];
    const converted = usdValue / tokenRates[token1.abbreviation];
    dispatch(setAmount2(safeText));
    dispatch(setAmount1(formatToSix(converted)));
  };

  const validateFields = (amount1: string, amount2: string) => {
    const newErrors = {
      token1: !token1,
      token2: !token2,
      amount1: !amount1 || amount1 === "0",
      amount2: !amount2 || amount2 === "0",
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((e) => e);
  };

  return { errors, handleToggleUSD, handleAmount1Change, handleAmount2Change, validateFields };
};
