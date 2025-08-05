import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { Images } from '../../assets';
import AssetsHeader from '../../components/AssetsHeader ';
import ProfileInfo from '../../components/ProfileInfo';
import AssetsTransferDetails from '../../components/AssetTransferDetails';
import SwipeToSend from '../../components/SwipeToSend';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useAppSelector } from '../../store/hooks'

const { width } = Dimensions.get('window');

const ReviewSend = () => {
   const { selectedAsset } = useAppSelector(state => state.selectedAsset)
const note = useAppSelector(state => state.note.note);
const amount = useAppSelector(state => state.amount.amount);


   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  return (
    <View style={styles.container}>
      <AssetsHeader title="Review Send" />
      
      <View style={styles.profile}>
        <ProfileInfo />
      </View>

      <View>
        {selectedAsset && (
      <AssetsTransferDetails
       logo={selectedAsset.logo}
      name={selectedAsset.name}
      short={selectedAsset.short}
      price={parseFloat(selectedAsset.price)}
      amount={parseFloat(amount)}  
      note={note}
      />
      )}
      </View>
     <View style={styles.footer}>
     <SwipeToSend
      placeholder="Swipe to Send"
      onNavigate={() => {
      navigation.navigate('TransactionStatus');
      }}
      />
</View>

    </View>
  );
};

export default ReviewSend;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01021D',

  },
  profile: {
    marginTop: 10,
    marginBottom:50,
  },
  footer:{
    position:'absolute',
    bottom:0,
    left:0,
    right:0
  }
 
});