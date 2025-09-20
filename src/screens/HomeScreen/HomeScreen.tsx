import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';



import { ActionButtons } from '../../components/ActionButtons';
import { BottomSheetUnifiedRef } from '../../components/BottomSheet';
import { BottomSheetWrapper } from '../../components/bottomSheetWrapper';
import FullSkeletonLoader from '../../components/FullSkeletonLoader';
import { HeaderNav } from '../../components/HeaderNav';
import IntroducingCards from '../../components/IntroducingCard';
import MarketActivityCarousel from '../../components/marketActivityCarousel';
import ProjectsSection from '../../components/projectsSection';
import { ProsSection } from '../../components/prosSection';
import { SummaryCarousel } from '../../components/summaryCarousel';
import { AppNavigatorParamList } from '../../navigators/routeNames'; 
import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { setHasLoadedHome } from '../../store/slices/appSlice';

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const hasLoadedHome = useAppSelector((state) => state.app.hasLoadedHome);
  const [loading, setLoading] = useState(!hasLoadedHome);
  const bottomSheetRef = useRef<BottomSheetUnifiedRef>(null);

const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  useEffect(() => {
    if (!hasLoadedHome) {
      const timer = setTimeout(() => {
        setLoading(false);
        dispatch(setHasLoadedHome(true));
      }, 2500);
      return () => clearTimeout(timer);
    }
    setLoading(false);
    return;
  }, [hasLoadedHome, dispatch]);

  useEffect(() => {
    if (!loading && bottomSheetRef.current) {
      const timer = setTimeout(() => {
        bottomSheetRef.current?.closeSheet();
      }, 100);
      return () => clearTimeout(timer);
    }
    return;
  }, [loading]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderNav />

      {loading ? (
        <FullSkeletonLoader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <SummaryCarousel />
          <ActionButtons />
          <ProsSection onPress={() => navigation.navigate('ProsScreen')} />
          <MarketActivityCarousel />
          <IntroducingCards />
          <ProjectsSection />
        </ScrollView>
      )}

      {!loading && <BottomSheetWrapper navigation={navigation} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#01022C',
  },
});

export default HomeScreen;
