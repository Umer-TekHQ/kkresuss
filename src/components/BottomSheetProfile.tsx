import React, { useRef, useMemo, useCallback, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetBackdropProps } from '@gorhom/bottom-sheet';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Images } from '../assets';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, Easing } from 'react-native-reanimated';

export interface BottomSheetProfileRef {
  openSheet: () => void;
  closeSheet: () => void;
}

const BottomSheetProfile = React.forwardRef<BottomSheetProfileRef, { navigation: any }>(
  ({ navigation }, ref) => {
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [isOpen, setIsOpen] = useState(false);

    const snapPoints = useMemo(() => [hp('8%'), hp('50%')], []);

    const openSheet = useCallback(() => {
      bottomSheetRef.current?.snapToIndex(1);
    }, []);

    const closeSheet = useCallback(() => {
      bottomSheetRef.current?.snapToIndex(0);
    }, []);

    React.useImperativeHandle(ref, () => ({
      openSheet,
      closeSheet,
    }));

    const rotation = useSharedValue(0);

    const animatedStyle = useAnimatedStyle(() => ({
      transform: [{ rotate: `${rotation.value}deg` }],
    }));

    const handleSheetChange = useCallback(
      (index: number) => {
        rotation.value = withTiming(index === 1 ? 180 : 0, {
          duration: 300,
          easing: Easing.out(Easing.ease),
        });
        setIsOpen(index === 1);
      },
      [rotation]
    );

    const toggleSheet = useCallback(() => {
      if (isOpen) {
        bottomSheetRef.current?.snapToIndex(0);
      } else {
        bottomSheetRef.current?.snapToIndex(1);
      }
    }, [isOpen]);

    const renderBackdrop = useCallback(
      (props: BottomSheetBackdropProps) => (
        <BottomSheetBackdrop
          {...props}
          appearsOnIndex={1}
          disappearsOnIndex={0}
          pressBehavior="collapse"
          opacity={0.5}
        />
      ),
      []
    );

    return (
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
          <TouchableOpacity activeOpacity={0.7} onPress={toggleSheet}>
            <View style={styles.headProfileRow}>
              <Image source={Images.profileheadlogo} style={styles.headimgP} />
              <Text style={styles.headingP}>Supported Networks</Text>

              <View style={{ width: 28, height: 25, justifyContent: 'center', alignItems: 'center' }}>
                <Animated.Image
                  source={Images.up}
                  style={[{ width: 28, height: 25, tintColor: '#4898F3' }, animatedStyle]}
                />
              </View>
            </View>
          </TouchableOpacity>

          <View style={styles.expandableContent}>
            <View style={styles.l1}>
              <View style={styles.rowLeft}>
                <Image source={Images.base} />
                <Text style={styles.l1text}> Base Network</Text>
              </View>
              <Text style={styles.trailingText}>Crypto and NFTs</Text>
            </View>

            <View style={styles.l12}>
              <View style={styles.rowLeft}>
                <Image source={Images.solanalogo} style={styles.solanalogo} />
                <Text style={styles.l1textS}> Solana Network</Text>
              </View>
              <Text style={styles.trailingText}>Crypto only</Text>
            </View>

            <Text style={styles.bottomtext}>
              Do not send assets over Ethereum mainnets or they will be lost.
            </Text>

            <TouchableOpacity
              style={styles.LMBtn}
              onPress={() => {
                navigation.navigate('ProfileBottom');
                closeSheet();
              }}
            >
              <Text style={{ color: 'white' }}>Learn More</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheet>
    );
  }
);

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#10132C',
  },
  contentContainer: {
    flex: 1,
    paddingTop: hp('1%'),
  },
  expandableContent: {
    flex: 1,
    paddingBottom: hp('2%'),
  },
  headProfileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4%'),
    marginBottom: 7,
  },
  headimgP: {
    padding: wp('3%'),
    marginTop: 5,
    width: wp('9%'),
    height: hp('5%'),
    resizeMode: 'contain',
  },
  headingP: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '600',
    marginTop: 6,
    flex: 1,
    marginLeft: wp('5%'),
  },
  upimgP: {
    marginTop: 5,
    width: 28,
    height: 25,
    tintColor: '#4898F3',
  },
  l1: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    paddingVertical: 20,
    borderTopRightRadius: 20,
  },
  l12: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingHorizontal: wp('4%'),
    borderTopWidth: 0.5,
    borderColor: '#101684',
    borderTopRightRadius: 20,
    paddingVertical: 20,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  l1text: {
    color: 'white',
    fontSize: 18,
    marginLeft: 10,
  },
  l1textS: {
    color: 'white',
    fontSize: 18,
    marginLeft: 16,
  },
  trailingText: {
    color: 'lightblue',
    marginTop: 2,
    fontSize: 15,
    textAlign: 'right',
  },
  solanalogo: {
    width: 20,
    height: 20,
  },
  bottomtext: {
    color: 'lightblue',
    marginHorizontal: wp('5%'),
    marginTop: 15,
  },
  LMBtn: {
    backgroundColor: '#0a0a23',
    paddingVertical: 10,
    alignItems: 'center',
    marginHorizontal: wp('5%'),
    borderRadius: 20,
    borderColor: '#4898F3',
    borderWidth: 1,
    marginTop: 15,
  },
});

export default BottomSheetProfile;

