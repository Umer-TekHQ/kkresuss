import React, { useState,useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Images } from '../../assets';
import AppButton from '../../components/AppButton';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import ProfileInfo from '../../components/ProfileInfo';
import AmountInputSection from '../../components/AmountInputSection';
import WarningBox from '../../components/WarningBox';
import AssetInfoBox from '../../components/AssetInfoBox';
import { useAppSelector,useAppDispatch } from '../../store/hooks'
import { setNote } from '../../store/slices/noteSlice';
import { setAmount } from '../../store/slices/amountSlice';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback } from 'react';



const SendDetails = () => {
  const { selectedAsset } = useAppSelector(state => state.selectedAsset)
  const note = useAppSelector(state => state.note.note);
const amount = useAppSelector(state => state.amount.amount);
const dispatch = useAppDispatch();

  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
  const availableAmount = 0.1288223;
  const ethPrice = 2047.62; 
  const enteredAmount = parseFloat(amount);
  const isInsufficient = enteredAmount > availableAmount * ethPrice;

  const handleReviewPress = () => {
    navigation.navigate('Review');
  };


  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
   
      if (e.data.action.type === 'GO_BACK' || e.data.action.type === 'POP') {
        dispatch(setNote(''));
        dispatch(setAmount(''));
      }
    });

    return unsubscribe;
  }, [navigation]);

return (
  <View style={styles.wrapper}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Image source={Images.backscreen} style={styles.backIconSmall} />
      </TouchableOpacity>
      <View style={styles.headerContent}>
        <ProfileInfo />
        
       <AmountInputSection
       amount={amount}
      setAmount={(val) => dispatch(setAmount(val))}
       isInsufficient={isInsufficient}
       />
      </View>
    
      <Text style={styles.availableLabel}>Available Balance:</Text>

      
      {selectedAsset && (
  <AssetInfoBox
    logo={selectedAsset.logo}
    name={selectedAsset.name}
    short={selectedAsset.short}
    price={parseFloat(selectedAsset.price.replace('$', '').replace(',', ''))}
    availableAmount={parseFloat(selectedAsset.amount)}
  />
)}


      <Text style={styles.noteLabel}>Note to Self <Text style={styles.optionalText}>(Optional)</Text></Text>
      <TextInput
        placeholder="What's it for?"
        placeholderTextColor="#ADD2FD"
        style={styles.input}
        value={note}
       onChangeText={(val) => dispatch(setNote(val))}
      />
    </ScrollView>

    {isInsufficient ?
    <WarningBox />
    : 
    (
      <View style={styles.fixedBottom}>
        <View style={styles.buttonWrapper}>
          <AppButton label="Review Transfer" onPress={handleReviewPress}  disabled={!amount}/>
        </View>
      </View>
    )}
  </View>
);

};

export default SendDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#01021D',
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal:12,//before qa padding:16
    paddingBottom: 60,
  },
  backBtn: {
    marginBottom: 16,
  },
  backIconSmall: {
    tintColor:'white',
    width: 31,
    height: 31,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 24,
  },
  availableLabel: {
    color: '#ADD2FD',
    fontSize: 14,
    marginBottom: 4,
    left:4, // it was 0 before 
  }, 
  noteLabel: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  input: {
    borderRadius: 10,
    color: '#FFFFFF',
  paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    marginBottom: 16,
  },
  buttonWrapper: {
   paddingBottom: 8,
  },
  fixedBottom: {
  position: 'absolute',
  bottom: 20,
  left: 0,
  right: 0,
  backgroundColor: '#01021D',
 
},
optionalText: {
  color: '#ADD2FD',
},

});