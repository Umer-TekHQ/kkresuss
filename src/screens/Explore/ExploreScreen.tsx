import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StatusBar,
} from 'react-native';
import styles from '../../styles/homestyles';
import { Images } from '../../assets';
import { SkeletonLoader } from '../../components/SkeletonLoader';
import { ExploreButtons } from '../../components/ExploreButtons';
import { ExploreCard } from '../../components/ExploreCards';
import { exploreSections } from '../../mock/exploreData';
import { HeaderNav } from '../../components/HeaderNav';


export const ExploreScreen: React.FC = ({ navigation }: any) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <HeaderNav />
      <ScrollView contentContainerStyle={styles.content}>
        <Text
          style={[
            styles.profileName,
            {
              fontSize: 40,
              marginBottom: 12,
              marginTop: 3,
              width: 152,
              height: 50,
            },
          ]}
        >
          Explore
        </Text>

        <ExploreButtons />

        {loading ? (
          <SkeletonLoader variant="explore-card" />
        ) : (
          <View style={{ justifyContent: 'space-between', marginTop: 16 }}>
            {exploreSections.map((section, sectionIndex) => (
              <View key={sectionIndex}>
                <Text style={styles.sectionTitle}>{section.section}</Text>
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
