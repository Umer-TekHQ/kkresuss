import 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
  StatusBar,
  Dimensions,
  StyleSheet
} from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { Images } from '../../assets';
import { ActionButtons } from '../../components/ActionButtons';
import { BottomSheetUnifiedRef } from '../../components/BottomSheet';
import BottomSheetHome from '../../components/BottomSheetHome';
import FullSkeletonLoader from '../../components/FullSkeletonLoader';
import { HeaderNav } from '../../components/HeaderNav';
import IntroducingCards from '../../components/IntroducingCard';
import { MarketActivityCard } from '../../components/MarketActivityCard';
import { Projects } from '../../components/Projects';
import { ProjectsList } from '../../components/ProjectsList';
import { SummaryCard } from '../../components/SummaryCard';
import WelcomeOverlay from '../../components/WelcomeOverlay';
import { AppNavigatorParamList } from '../../navigators/routeNames';

export const HomeScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [showOverlay, setShowOverlay] = useState(false);
  const bottomSheetRef = useRef<BottomSheetUnifiedRef>(null);

  const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>();

  const { width: screenWidth } = Dimensions.get("window");
  const CARD_WIDTH = screenWidth * 0.85; 

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
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

      {loading ? (
        <FullSkeletonLoader />
      ) : (
        <ScrollView>
          <>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <FlatList
                data={[1, 2]}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => `summary-${index}`}
                renderItem={() => (
                  <SummaryCard />
                )}
                snapToInterval={Dimensions.get('window').width / 1} 
                snapToAlignment="center"
                decelerationRate="fast" 
                contentContainerStyle={{
                  paddingHorizontal: (screenWidth - CARD_WIDTH) / 4, 
                }}
              />
            </View>

            <View style={{marginHorizontal: wp('2%')}}>
              <ActionButtons />
            </View>
            
            <View style={styles.prosSection}>
              <TouchableOpacity onPress={() => navigation.navigate('ProsScreen')}>
                <Text style={styles.prosText}>What the Pros are Buying</Text>
              </TouchableOpacity>
              
              <TouchableOpacity onPress={() => navigation.navigate('ProsScreen')}>
                <Image
                  source={Images.pros}
                  style={[
                    styles.prosIcon,
                    {
                      width: wp('9%'), 
                      height: wp('9%'),
                    },
                  ]}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={[1, 2]}
              horizontal
              showsHorizontalScrollIndicator={false}
              keyExtractor={(item, index) => `market-${index}`}
              renderItem={() => <MarketActivityCard />}
              snapToInterval={Dimensions.get('window').width / 1}   
              snapToAlignment="center"
              decelerationRate="fast"
              contentContainerStyle={{
                paddingHorizontal: (screenWidth - CARD_WIDTH) / 4, 
              }}
            />

            <IntroducingCards />

            <Text style={styles.projectsText}>Projects to Try</Text>
            <View style={{marginLeft: 15}}>
              <Projects />
            </View>
                
            <View style={{marginBottom: 110, marginRight: 8,}}>
              <ProjectsList />
            </View>
          </>
        </ScrollView>
      )}

      {showOverlay && <WelcomeOverlay onClose={() => setShowOverlay(false)} />}

        {!loading && (
          <View pointerEvents="box-none" style={styles.bottomSheetContainer}>
            <BottomSheetHome navigation={navigation} />
          </View>
        )}

    </View>
  );
};

const styles = StyleSheet.create({

  container: {
    backgroundColor: '#01022C',
  },
  prosSection:{
  flexDirection: 'row',
  justifyContent: 'space-between',
},
prosText:{
  color: '#7AB7FD',
  fontSize: 16,
  marginTop: 4,
  marginLeft: 15,
  marginBottom: 15,
},
prosIcon:{
  paddingBottom: 15,
  marginRight: wp('6%'),
},
projectsText:{
  color: '#7AB7FD',
  fontSize: 16,
  marginTop: 4,
  marginLeft: 15,
  marginBottom: 5,
},
  bottomSheetContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    pointerEvents: 'box-none',
    width: '100%',
  },

})