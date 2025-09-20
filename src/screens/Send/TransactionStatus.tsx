import { useNavigation } from '@react-navigation/native';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, BackHandler, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Images } from '../../assets';
import AssetsHeader from '../../components/AssetsHeader ';
import TransactionCompleteCard from '../../components/TransactionCompleteCard';
import TransactionInfoRow from '../../components/TransactionInfoRow';
import { AppNavigatorParamList, routeNames } from '../../navigators/routeNames';
import { useAppSelector } from '../../store/hooks';
import { Colors } from '../../theme/colors';


const TransactionStatus = () => {
  const note = useAppSelector(state => state.note.note);
  const { username, profilePicture } = useAppSelector(state => state.user);
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(routeNames.BottomNavigator);
        return true;
      };
      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => subscription.remove(); 
    }, [navigation])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <ScrollView 
          style={{flex: 1}} 
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={false}
        >
          <AssetsHeader 
            title="Transaction Status" 
            leftIcon={Images.cancel} 
            customBackAction={() => navigation.navigate(routeNames.BottomNavigator)} 
          />
          
          <View style={{ marginBottom: 10 }}>
            <TransactionCompleteCard  
              name={username || 'My Wallet'}
              image={profilePicture || Images.logo}
            />
          </View>
          <View style={styles.divider}/>
          <TransactionInfoRow note={note} />
        </ScrollView>
        <View style={styles.footer}>
          <TouchableOpacity style={styles.viewAllButton}>
            <Text style={styles.viewAllText}>View Details on BaseScan </Text>
            <Image source={Images.greenArrowUp} style={styles.arrow}/>
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
    flexDirection: 'row',
    justifyContent: 'center',
    width: '90%',
    paddingVertical: 12,
    borderRadius: 99,
    borderWidth: 1,
    borderColor: Colors.blue,
    backgroundColor: 'transparent',
  },
  arrow:{
    tintColor: Colors.white,
    width: 13,
    height: 10,
    marginTop: 7,
    marginLeft: 5,
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
  divider:{
    height: 1,
    backgroundColor: Colors.background1,
    flex: 1,
    marginHorizontal: 20,
  }
});
