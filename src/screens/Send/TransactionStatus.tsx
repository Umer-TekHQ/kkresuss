import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import AssetsHeader from '../../components/AssetsHeader ';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import TransactionCompleteCard from '../../components/TransactionCompleteCard';
import TransactionInfoRow from '../../components/TransactionInfoRow';
import { useAppSelector } from '../../store/hooks'

const TransactionStatus = () => {
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
const note = useAppSelector(state => state.note.note);
const { username, profilePicture } = useAppSelector(state => state.user);


  return (
    <View style={styles.container}>
      <AssetsHeader title="Transaction Status" leftIcon={Images.cancel} />
      <View style={{marginBottom:10,}}>
      <TransactionCompleteCard  name={username || 'My Wallet'}
  image={profilePicture || Images.logo}/>
      </View>
  
      <TransactionInfoRow note={note}/>


      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.viewAllButton}
          onPress={() => navigation.navigate('QR')}
        >
        <Text style={styles.viewAllText}>View Details on BaseScan ↗</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TransactionStatus;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01021D',
  },
  viewAllButton: {
    marginTop: 30,
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: '#4898F3',
    backgroundColor: 'transparent',
  },
  viewAllText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    marginBottom: 30,
  },
});