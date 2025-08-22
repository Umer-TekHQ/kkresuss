import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AssetsHeader from '../../components/AssetsHeader ';
import TopAssetsCard from '../../components/TopAssetsCard';
import TopAssetsCardSkeleton from '../../components/TopAssetsCardSkeleton';
import { Images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { useAppDispatch } from '../../store/hooks'
import { setSelectedAsset } from '../../store/slices/selectedAssetSlice'
import { useSharedValue } from 'react-native-reanimated';
import { BottomSheetUnified } from '../../components/BottomSheet';




const SelectCurrency = () => {
  const [loading, setLoading] = useState(true);
 const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
 const dispatch = useAppDispatch()

  const translateY = useSharedValue(0);

  const handleAssetPress = (asset: any) => {
  dispatch(setSelectedAsset(asset))
  navigation.navigate('Recepient')
}

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <View style={styles.container}>
      <AssetsHeader title="Select Currency" showRightIcons={!loading} leftIcon={loading ? Images.cancel : undefined}  />
      <View style={styles.descriptionWrapper}>
        <Text style={styles.descriptionText}>
          Select the cryptocurrency you would like to send from the list below.
        </Text>
      </View>

      <View style={styles.cardWrapper}>
      
        {loading ? <TopAssetsCardSkeleton /> : <TopAssetsCard showChange={false}  onAssetPress={handleAssetPress} />}

      </View>

       <BottomSheetUnified screen="profile" translateY={translateY} />
    </View>
  );
};

export default SelectCurrency;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#01021D',
  },
  descriptionWrapper: {
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  descriptionText: {
    width: 293,
    height: 45,
    textAlign: 'center',
    color: '#ADD2FD',
    fontSize: 15,
    lineHeight: 20,
  },
  cardWrapper: {
    //paddingHorizontal: 16,
    marginTop: 12,
    alignItems:'center'
  },
});