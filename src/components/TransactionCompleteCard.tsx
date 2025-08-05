import { StyleSheet, Text, View, Image, ImageSourcePropType } from 'react-native';
import React from 'react';
import { useAppSelector } from '../store/hooks';

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
        <Image source={image} style={styles.avatar} />
        <Text style={styles.userLabel}>{name}</Text>
      </View>

    
      <View style={styles.arrowWrapper}>
        <View style={styles.divider} />
        <Text style={styles.arrow}>↓</Text>
        <View style={styles.divider} />
      </View>

   
      <View style={styles.userSection}>
        <View style={styles.initialsCircle}>
          {logo ? (
            <Image source={logo} style={styles.avatar} />
          ) : (
            <Text style={styles.initials}>
              {rname ? getInitials(rname) : 'NA'}
            </Text>
          )}
        </View>
        <Text style={styles.userLabel}>{rname || subtext || 'Unnamed'}</Text>
      </View>

      {/* Token Info */}
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
    backgroundColor: '#080C4C',
    marginVertical: 4,
    marginHorizontal:15,
    borderRadius: 20,
    overflow: 'hidden',
    alignItems: 'center',
    height: 468,
    justifyContent: 'flex-start',
  },
  userSection: {
    alignItems: 'center',
    marginBottom: 14,
    marginTop:5,
  },
avatar: {
  width: 100,
  height: 100,
  borderRadius: 50,
  resizeMode: 'cover',
},
initialsCircle: {
  width: 100,
  height: 100,
  borderRadius: 50,
  backgroundColor: '#292A6E',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: '#292A6E',
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
    width: '100%',
    justifyContent: 'center',
    gap: 8,
  },
  arrow: {
    fontSize: 24,
    color: '#CEB55A',
    marginHorizontal: 8,
  },
  divider: {
    height: 1,
    backgroundColor: '#10178A',
    flex: 1,
    marginHorizontal: 8,
  },
tokenSection: {
  height: 93,
  width: '100%',
  backgroundColor: '#030A74',
  paddingHorizontal: 16,
  paddingVertical: 12,
  justifyContent: 'center',
},
tokenLabel: {
  color: '#CEB55A',
  fontSize: 15,
  marginBottom: 4,
},
tokenRow: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
},
tokenName: {
  color: 'white',
  fontSize: 19,
 
},
tokenValue: {
  color: 'white',
  fontSize: 19,
 
},
tokenDate: {
  color: '#ADD2FD',
  fontSize: 15,
},
tokenUsd: {
  color: '#ADD2FD',
  fontSize: 15,
},

  statusBar: {
    width: '100%',
    backgroundColor: '#F2C94C',
    paddingVertical: 10,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    position: 'absolute',
    bottom: 0,
  },
  statusText: {
    fontSize:15,
    textAlign: 'center',
    color: '#01032C',
    fontWeight: 'bold',
  },
});