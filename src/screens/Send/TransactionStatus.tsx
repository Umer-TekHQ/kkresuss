import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { Colors } from '../../theme/colors';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Images } from '../../assets';
import AssetsHeader from '../../components/AssetsHeader ';
import TransactionCompleteCard from '../../components/TransactionCompleteCard';
import TransactionInfoRow from '../../components/TransactionInfoRow';
import { useAppSelector } from '../../store/hooks';


const TransactionStatus = () => {
  const note = useAppSelector(state => state.note.note);
  const { username, profilePicture } = useAppSelector(state => state.user);
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={{flex: 1}} 
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <AssetsHeader title="Transaction Status" leftIcon={Images.cancel} />
          <View style={{ marginBottom: 10 }}>
            <TransactionCompleteCard  
              name={username || 'My Wallet'}
              image={profilePicture || Images.logo}
            />
          </View>
          <TransactionInfoRow note={note} />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.viewAllButton}
          >
            <Text style={styles.viewAllText}>View Details on BaseScan ↗</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default TransactionStatus;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
  },
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
    justifyContent: 'space-between',
  },
  viewAllButton: {
    alignSelf: 'center',
    width: '90%',
    paddingVertical: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: 'transparent',
  },
  viewAllText: {
    color: Colors.white,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
  },
  footer: {
    paddingBottom: 10,
  },
});
