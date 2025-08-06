import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
  Dimensions
} from 'react-native';
import styles from '../../styles/homestyles';
import { Images } from '../../assets';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { ExploreButtons } from '../../components/ExploreButtons';
import { ExploreCard } from '../../components/ExploreCards';
import { exploreSections } from '../../mock/exploreData';
import { HeaderNav } from '../../components/HeaderNav';


const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const ExploreScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);
  const titleFontSize = Math.max(28, Math.min(40, screenWidth * 0.09));
  const titleWidth = Math.max(120, Math.min(180, screenWidth * 0.38));
  const cardRowMarginTop = Math.max(10, Math.min(24, screenHeight * 0.02));
  const sectionTitleFontSize = Math.max(16, Math.min(22, screenWidth * 0.055));
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderNav />
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={[
            styles.profileName,
            {
              fontSize: titleFontSize,
              marginBottom: 12,
              marginTop: 3,
              width: titleWidth,
              height: titleFontSize + 10,
            },
          ]}
        >
          Explore
        </Text>

        <ExploreButtons />

        {loading ? (
          <SkeletonLoader variant="explore-card" />
        ) : (
          <View style={{ justifyContent: 'space-between', marginTop: cardRowMarginTop }}>
            {exploreSections.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <Text
                  style={[
                    styles.sectionTitle,
                    { fontSize: sectionTitleFontSize }
                  ]}
                >
                  {section.section}
                </Text>
                <View style={styles.cardRow}>
                  {section.data.map((item, cardIndex) => (
                    <TouchableOpacity
                      key={cardIndex}
                      onPress={() =>
                        item.title === 'Uniswap'
                          ? navigation.navigate('bottomscreen')
                          : null
                      }
                    >
                      <ExploreCard
                        title={item.title}
                        description={item.description}
                        image={item.image}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
};
