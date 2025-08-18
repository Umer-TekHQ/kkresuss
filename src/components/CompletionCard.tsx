import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../store/hooks';

interface CardProps {
  label: string | React.ReactNode;
  value: string | React.ReactNode;
  usd?: string;
  strike?: boolean;
  isLink?: boolean;
  linkLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  label,
  value,
  usd,
  strike = false,
}) => {
  const { token1, token2 } = useAppSelector(state => state.trade);
  
  let displayLabel = label;
  if (label === "Traded" && token1) {
    displayLabel = `${token1.abbreviation} Traded`;
  } else if (label === "Provider Fees" && token2) {
    displayLabel = `${token2.abbreviation} Provider Fees`;
  }

  return (
    <View style={styles.cardContainer}>
      <Text style={styles.label}>{displayLabel}</Text>
      <View>
      <View style={styles.valueRow}>
        <Text style={[styles.value, strike && styles.strike]}>{value}</Text>
        {usd && <Text style={styles.usd}>{usd}</Text>}
      </View>
    </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#182281ff',
    padding: 16,
    marginTop: 8,
  },
  label: {
    fontSize: 15,
    color: '#A1C4EE',
    marginBottom: 6,
  },
  valueRow: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  value: {
    fontSize: 16,
    // fontWeight: '600',
    color: '#A1C4EE',
    alignSelf: 'flex-end'
  },
  usd: {
    fontSize: 15,
    color: '#A1C4EE',
    alignSelf: 'flex-end'

  },
  strike: {
    textDecorationLine: 'line-through',
    color: '#A1C4EE',
  },
  link: {
    color: '#4490F6',
    marginTop: 10,
    fontSize: 14,
    fontWeight: '500',
  },
});
