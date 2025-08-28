import React, { useRef, useMemo, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing, runOnJS, useAnimatedReaction } from 'react-native-reanimated';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '../assets';

const securityItems = [
  { label: 'Advanced Verification', screen: 'Recovery' },
  { label: 'Recovery Phone', screen: 'Recovery' },
  { label: 'Insurance Coverage' },
  { label: 'Device Biometrics' },
  { label: 'Email Verification' },
];

export interface BottomSheetHomeRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const BottomSheetHome = forwardRef<BottomSheetHomeRef, { navigation: any }>(({ navigation }, ref) => {
  const bottomSheetRef = useRef<BottomSheet>(null);
  const rotation = useSharedValue(0);
  const [isOpen, setIsOpen] = useState(false);

  const snapPoints = useMemo(() => [hp('15.5%'), hp('70.67%')], []);

  useImperativeHandle(ref, () => ({
    openSheet: () => bottomSheetRef.current?.snapToIndex(1),
    closeSheet: () => bottomSheetRef.current?.snapToIndex(0),
  }));

  const arrowAnimatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

const handleSheetChange = useCallback(
  (index: number) => {
    if (index === 1) { 
      rotation.value = withTiming(180, { duration: 300, easing: Easing.out(Easing.ease) });
      setIsOpen(true);
    } else { 
      rotation.value = withTiming(0, { duration: 300, easing: Easing.out(Easing.ease) });
      setIsOpen(false);
    }
  },
  [rotation]
);


  const renderBackdrop = (props: BottomSheetBackdropProps) => (
    <BottomSheetBackdrop
      {...props}
      disappearsOnIndex={0}
      appearsOnIndex={1}
      pressBehavior="collapse"
      opacity={0.5}
    />
  );

  const responsiveHomeHeadMargin = Math.max(0.5, wp('0.5%'));
  const responsiveHomeNumbersMargin = Math.max(30, wp('32%'));

  return (
    <View style={styles.absoluteContainer}>
        <BottomSheet
          ref={bottomSheetRef}
          index={0}
          snapPoints={snapPoints}
          enablePanDownToClose={false}
          backdropComponent={renderBackdrop}
          backgroundStyle={styles.background}
          handleComponent={null}
          onChange={handleSheetChange} 
        >
        <BottomSheetView style={styles.contentContainer}>
          <View style={[styles.head, { marginHorizontal: responsiveHomeHeadMargin }]}>
            <Image source={Images.headimage} style={styles.headImg} />
            <Text style={styles.heading}>My Security Score</Text>
            <Text style={[styles.numbers, { marginLeft: responsiveHomeNumbersMargin }]}>2/5</Text>
            <TouchableOpacity>
              {isOpen ? (
                <Animated.Image source={Images.whitecross} style={styles.upImg} />
              ) : (
                <Animated.Image source={Images.up} style={[styles.upImg, arrowAnimatedStyle]} />
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.Liner}>
            <LinearGradient
              colors={['#2B36E4', '#CEB55B']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.line1}
            />
            {[...Array(3)].map((_, i) => (
              <View key={i} style={styles.line} />
            ))}
          </View>

          <View style={styles.Lists}>
            {securityItems.map((item, i) => (
              <View style={styles.list} key={i}>
                <TouchableOpacity onPress={item.screen ? () => navigation.navigate(item.screen) : undefined}>
                  <View style={styles.L1}>
                    <Image source={i < 3 ? Images.checked : Images.checked1} style={styles.img1} />
                    <Text style={styles.T1}>{item.label}</Text>
                    {i === 2 && <Image source={Images.probadge1} style={styles.proBdg} />}
                    {i < 3 && (
                      <Image
                        source={Images.back}
                        style={[
                          styles.backBtn,
                          i === 1 && styles.backBtn1,
                          i === 2 && styles.backBtn2,
                        ]}
                      />
                    )}
                  </View>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Settings')}>
            <View style={styles.btnSty}>
              <Image source={Images.secure1} style={styles.secure} />
              <Text style={styles.btnText}>Manage In Settings</Text>
            </View>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheet>
    </View>
  );
});

const styles = StyleSheet.create({
  absoluteContainer: { position: 'absolute', bottom: 0, left: 0, right: 0, height: hp('100%') },
  background: { backgroundColor: '#030A74', borderTopLeftRadius: 15, borderTopRightRadius: 15 },
  contentContainer: { flex: 1 },
  head: { flexDirection: 'row', marginBottom: 7, textAlign: 'center', alignItems: 'center', marginTop: 5 },
  headImg: { marginLeft: 15, width: 16, height: 20 },
  heading: { color: '#ffffff', fontSize: 14, fontWeight: '600', marginLeft: 15 },
  numbers: { marginLeft: 79, fontSize: 13, color: 'gold' },
  upImg: { marginLeft: wp('5%'), marginTop: 5, width: 22, height: 30 },
  Liner: { flexDirection: 'row', marginHorizontal: 10, marginTop: 10 },
  line1: { width: 120, height: 4, alignSelf: 'center', backgroundColor: 'gold', borderRadius: 2, marginHorizontal: 4 },
  line: { width: 55, height: 4, marginLeft: 4, backgroundColor: '#10132C', alignSelf: 'center', marginHorizontal: 8, borderRadius: 2 },
  Lists: { marginTop: 10 },
  list: { marginHorizontal: 12, marginBottom: 15 },
  L1: { flexDirection: 'row', alignItems: 'center' },
  img1: { marginTop: 4 },
  T1: { marginTop: 5, marginLeft: 10, fontSize: 18, color: '#D4EBFF', flex: 1 },
  proBdg: { marginLeft: wp('13%'), marginTop: 7, width: 45, height: 25, borderRadius: 5 },
  backBtn: { fontSize: 10, marginLeft: wp('25%'), marginTop: 12, tintColor: '#086CE1', marginRight: 10 },
  backBtn1: { marginLeft: wp('38%'), marginRight: 10 },
  backBtn2: { marginLeft: wp('4%'), marginRight: 10 },
  button: { flexDirection: 'row', alignSelf: 'center', borderWidth: 1, borderColor: 'lightblue', width: 175, borderRadius: 25, marginVertical: 10, marginBottom: 20 },
  btnSty: { flexDirection: 'row', marginLeft: 10, alignItems: 'center' },
  secure: { marginTop: 8, width: 19, height: 24 },
  btnText: { textAlign: 'center', padding: 10, color: 'white' },
});

export default BottomSheetHome;
