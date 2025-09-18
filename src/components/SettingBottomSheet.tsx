import React, { forwardRef, useRef, useMemo, useImperativeHandle } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { BottomSheetFlashList } from '@gorhom/bottom-sheet';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { Images } from '../assets';
import { settingsData } from '../mock/settingsData';
import { AppNavigatorParamList } from '../navigators/routeNames';
import { Colors } from '../theme/colors';

export interface SettingsBottomSheetRef {
  expand: () => void;
  collapse: () => void;
}

const SettingBottomSheet = forwardRef<SettingsBottomSheetRef, { onClose: () => void }>(
  ({ onClose }, ref) => {
    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();
    const bottomSheetRef = useRef<BottomSheet>(null);

    const snapPoints = useMemo(() => ['55%', '100%'], []);

    useImperativeHandle(ref, () => ({
      expand: () => bottomSheetRef.current?.snapToIndex(1),
      collapse: () => bottomSheetRef.current?.snapToIndex(0),
    }));

    const handleItemPress = (route?: keyof AppNavigatorParamList) => {
      if (route) {
        onClose();
        navigation.navigate(route as any);
      }
    };

    const renderItem = ({ item, index }: any) => {
      const isLastItem = index === settingsData.length - 1;
      return (
        <View>
          {index === 0 && <View style={styles.separator} />}

          <TouchableOpacity
            style={styles.item}
            onPress={() => handleItemPress(item.route)}
            activeOpacity={0.7}
          >
            <Image source={item.icon} style={styles.icon} />
            <View style={{ flex: 1 }}>
              <Text style={styles.itemTitle}>{item.title}</Text>
              <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
            </View>
            <Image source={Images.introducingArrow} style={styles.arrow} />
          </TouchableOpacity>

          {!isLastItem && <View style={styles.separator} />}
        </View>
      );
    };

    return (
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        backgroundStyle={styles.sheetBackground}
      >
        <BottomSheetFlashList
          style={{ flex: 1 }}
          data={settingsData}
          renderItem={renderItem}
          keyExtractor={(item) => item.title}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 30, flexGrow: 1 }}
          ListHeaderComponent={
            <View>
              <View style={styles.line} />
              <Text style={styles.sheetTitle}>Settings</Text>
            </View>
          }
          ListFooterComponent={
            <TouchableOpacity onPress={() => navigation.navigate('Welcome')}>
              <Text style={styles.delete}>Delete Account</Text>
            </TouchableOpacity>
          }
        />
      </BottomSheet>

    );
  }
);

export default SettingBottomSheet;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  sheetBackground: {
    backgroundColor: '#01032C',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    color: Colors.white,
    fontSize: 18,
    marginBottom: 10,
    textAlign: 'center',
    letterSpacing: 1,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flex: 1,
    paddingVertical: 10,
  },
  icon: {
    width: 16,
    height: 22,
    marginRight: 16,
    resizeMode: 'contain',
  },
  itemTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  itemSubtitle: {
    color: '#ADD2FD',
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    width: 18,
    height: 18,
    resizeMode: 'contain',
    marginLeft: 10,
    marginTop: 23,
  },
  delete: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 16,
  },
  line: {
    alignSelf: 'center',
    width: 50,
    height: 4,
    borderRadius: 4,
    backgroundColor: Colors.background4,
    marginBottom: 15,
  },
  separator: {
    height: 0.5,
    backgroundColor: '#183460',
    marginLeft: 33,
    marginVertical: 12,
  },
});
