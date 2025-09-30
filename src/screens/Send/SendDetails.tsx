import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';

import AmountInputSection from '../../components/AmountInputSection';
import AssetInfoBox from '../../components/AssetInfoBox';
import HeaderBackButton from '../../components/handleBackButton';
import NoteInputSection from '../../components/noteInputSection';
import ProfileInfo from '../../components/ProfileInfo';
import ReviewButtonSection from '../../components/reviewButtonSection';
import WarningBox from '../../components/WarningBox';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setAmount } from '../../store/slices/amountSlice';
import { setNote } from '../../store/slices/noteSlice';
import { Colors } from '../../theme/colors';

const SendDetails = () => {
  const { selectedAsset } = useAppSelector(state => state.selectedAsset);
  const amount = useAppSelector(state => state.amount.amount);
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const availableAmount = 0.1288223;
  const ethPrice = 2047.62;
  const enteredAmount = parseFloat(amount);
  const isInsufficient = enteredAmount > availableAmount * ethPrice;

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
    <SafeAreaView style={styles.wrapper}>
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={0}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <HeaderBackButton />
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
              price={parseFloat(
                selectedAsset.price.replace('$', '').replace(',', '')
              )}
              availableAmount={parseFloat(selectedAsset.amount)}
            />
          )}

          <NoteInputSection />
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.fixedBottom}>
        {isInsufficient ? (
          <WarningBox />
        ) : (
          <ReviewButtonSection disabled={!amount || enteredAmount <= 0} />
        )}
      </View>
    </SafeAreaView>
  );
};

export default SendDetails;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: Colors.backgroundAlt,
  },
  flex: {
    flex: 1,
  },
  container: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    paddingBottom: 80,
  },
  headerContent: {
    alignItems: 'center',
    marginBottom: 44,
    marginTop: -17,
  },
  availableLabel: {
    color: Colors.lightblue,
    fontSize: 14,
    marginBottom: 8,
    paddingHorizontal: 12,
  },
  fixedBottom: {
    backgroundColor: Colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingBottom: Platform.OS === 'ios' ? 20 : 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});