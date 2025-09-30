import React from 'react';
import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Images } from '../assets';
import { useAppSelector } from '../store/hooks';
import { Colors } from '../theme/colors';


type Props = {
  name: string;
  image: ImageSourcePropType;
};
const TransactionCompleteCard: React.FC<Props> = ({ name, image }) => {
  const { rname, logo, subtext } = useAppSelector(state => state.recipient);
  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(' ');
    const initials = names.map(n => n[0]).join('');
    return initials.slice(0, 2).toUpperCase();
  };
  return (
    <View style={styles.card}>
      <View style={styles.userSection}>
        <View style={styles.avatarParent}>
        <Image source={image} style={styles.avatar} />
        </View>
        <Text style={styles.userLabel}>{name}</Text>
      </View>
      <View style={styles.arrowWrapper}>
        <View style={styles.divider} />
          <Image source={Images.backYellow} style={styles.arrowIcon} />
        <View style={styles.divider} />
      </View>
      <View style={styles.userSection}>
        <View style={styles.initialsCircle}>
          {logo ? (
            <View style={styles.avatarParent}>
            <Image source={logo} style={styles.avatar} />
            </View>
          ) : (
            <Text style={styles.initials}>
              {rname ? getInitials(rname) : 'NA'}
            </Text>
          )}
        </View>
        <Text style={styles.userLabel}>{rname || subtext || 'Unnamed'}</Text>
      </View>
      <View style={styles.tokenSection}>
        <View style={{ flex: 1 }}>
          <Text style={styles.tokenLabel}>Sent</Text>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenName}>Rocket Pool ETH</Text>
            <Text style={styles.tokenValue}>0.10536859 ETH</Text>
          </View>
          <View style={styles.tokenRow}>
            <Text style={styles.tokenDate}>Thu, Apr 11, 2024</Text>
            <Text style={styles.tokenUsd}>$389.64</Text>
          </View>
        </View>
      </View>
      <View style={styles.statusBar}>
        <Text style={styles.statusText}>Transaction Complete</Text>
      </View>
    </View>
  );
};
export default TransactionCompleteCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.kresusBlue,
    borderRadius: 20,
    borderTopWidth: 2,
    borderRightWidth: 0.5,
    borderLeftWidth: 0.5,
    borderColor: Colors.background4,

    paddingTop: 20,
    alignItems: 'center',
    marginHorizontal: 7,
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 14,
    marginTop:5,
  },
  avatar: {
      width: 100,
      height: 100,
      borderRadius: 55,
      borderWidth: 5,
      borderColor: Colors.background4,
      marginBottom: 8,
      paddingVertical: 20,
      resizeMode: 'contain'
  },
  avatarParent: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: 'contain',
    backgroundColor: Colors.black,
  },
  initialsCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: Colors.background1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.background1,
  },
  initials: {
    color: 'white',
    fontWeight: '700',
    fontSize: 20,
  },
  userLabel: {
    color: 'white',
    fontSize: 15,
  },
  arrowWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    gap: 8,
  },
  arrow: {
    fontSize: 24,
    color: Colors.gold,
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.background1,
    flex: 1,
    marginHorizontal: 8,
  },
  tokenSection: {
      backgroundColor: Colors.background4,
      padding: 16,
      width: wp('96%'),
      marginTop: 20,
      justifyContent: 'space-between',
  },
  tokenLabel: {
    color: Colors.gold,
    fontSize: 15,
    marginBottom: 4,
  },
  tokenRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  tokenName: {
    color: Colors.white,
    fontSize: 19,
  
  },
  tokenValue: {
    color: Colors.white,
    fontSize: 19,
  
  },
  tokenDate: {
    color: Colors.lightblue,
    fontSize: 15,
  },
  tokenUsd: {
    color: Colors.lightblue,
    fontSize: 15,
  },
  statusBar: {
    backgroundColor: Colors.gold,
    paddingVertical: 10,
    width: wp('96%'),
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
    alignItems: 'center',
    marginHorizontal: 7
  },
  statusText: {
    fontSize:15,
    textAlign: 'center',
    color: Colors.background,
    fontWeight: '800',
    letterSpacing: 0.5,
  },
  arrowIcon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: Colors.gold, 
  },
});