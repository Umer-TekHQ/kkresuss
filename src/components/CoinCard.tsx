import { View, Text, Image, StyleSheet, ImageSourcePropType } from 'react-native';

import { Colors } from '../theme/colors';

interface CoinCardProps {
  name: string;
  price: string;
  change: number | string;
  logo: string | ImageSourcePropType;
}

const CoinCard = ({ name, price, change, logo }: CoinCardProps) => {
  const isURL = typeof logo === 'string';

  return (
    <View style={styles.card}>
      <Image source={isURL ? { uri: logo } : logo} style={styles.logo} />
      <View>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>{price}</Text>
        <Text style={[styles.change, { color: `${change}`.includes('-') ? 'red' : 'green' }]}>
          {change}
        </Text>
      </View>
    </View>
  );
};

export default CoinCard;

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: Colors.background,
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
    alignItems: 'center',
  },
  logo: {
    width: 36,
    height: 36,
    marginRight: 12,
  },
  name: {
    color: Colors.white,
    fontWeight: 'bold',
  },
  price: {
    color: Colors.white,
  },
  change: {
    fontSize: 12,
  },
});
