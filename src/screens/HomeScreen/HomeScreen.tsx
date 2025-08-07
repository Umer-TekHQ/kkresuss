import 'react-native-reanimated';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';

import { ActionButtons } from '../../components/ActionButtons';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { SummaryCard } from '../../components/SummaryCard';
import { MarketActivityCard } from '../../components/MarketActivityCard';
import { Projects } from '../../components/Projects';
import { ProjectsList } from '../../components/ProjectsList';
import { Images } from '../../assets';
import WelcomeOverlay from '../../components/WelcomeOverlay';
import { useNavigation } from '@react-navigation/native';
import Animated, { useSharedValue } from 'react-native-reanimated';
import { HeaderNav } from '../../components/HeaderNav';
import { BottomSheetUnified, BottomSheetUnifiedRef } from '../../components/BottomSheet';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import styles from '../../styles/homestyles';
import IntroducingCards from '../../components/IntroducingCard';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const HomeScreen: React.FC = () => {
  const translateY = useSharedValue(screenHeight);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('1D');
  const [showContent, setShowContent] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const bottomSheetRef = useRef<BottomSheetUnifiedRef>(null);

  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
      setShowContent(true);
      setShowOverlay(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading && bottomSheetRef.current) {
      const timer = setTimeout(() => {
        bottomSheetRef.current?.closeSheet();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [loading]);

  return (
      <View style={styles.container}>
        <StatusBar barStyle="light-content" />
        <HeaderNav />

        <ScrollView contentContainerStyle={styles.content}>
          {showContent ? (
            <>
              <FlatList
                data={[1, 2]}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                keyExtractor={(item, index) => `summary-${index}`}
                renderItem={() => (
                  <SummaryCard activeFilter={activeFilter} onFilterChange={setActiveFilter} />
                )}
                contentContainerStyle={{}}
                snapToAlignment="center"
              />
              <ActionButtons />
              <View style={styles.prossection}>
                <Text style={styles.prostext}>What the Pros are Buying</Text>
                <TouchableOpacity style={{}} onPress={() => navigation.navigate('ProsScreen')}>
                  <Image source={Images.pros} style={styles.prosicon} />
                </TouchableOpacity>
              </View>
              <FlatList
                data={[1, 2, 3]}
                horizontal
                pagingEnabled
                keyExtractor={(item, index) => `market-${index}`}
                renderItem={() => (
                  <View style={{ width: screenWidth * 0.84, height: screenWidth * 0.54 }}>
                    <MarketActivityCard />
                  </View>
                )}
                showsHorizontalScrollIndicator={false}
                // contentContainerStyle={{ paddingHorizontal: 5 }}
                ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
              />
              <IntroducingCards />
              <Text style={styles.prostext}>Projects to Try</Text>
              <Projects />
              <ProjectsList />
            </>
          ) : (
            <>
              <SkeletonLoader variant="home" />
            </>
          )}
        </ScrollView>

        {showOverlay && <WelcomeOverlay onClose={() => setShowOverlay(false)} />}

        <View pointerEvents="box-none" style={styles.bottomSheetContainer}>
          <BottomSheetUnified 
            ref={bottomSheetRef}
            screen="home" 
            translateY={translateY}
          />
        </View>
      </View>
  );
};
