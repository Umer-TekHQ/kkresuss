import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

import { ExploreCard } from "./ExploreCards";
import { Colors } from '../theme/colors';

type Props = {
  section: any;
  onSectionLayout: (name: string, event: any) => void;
  navigation: any;
};

const SectionBlock = ({ section, onSectionLayout, navigation }: Props) => (
  <View onLayout={(event) => onSectionLayout(section.section, event)}>
    <Text style={styles.sectionTitle}>{section.section}</Text>
    <View style={styles.cardRow}>
      {section.data.map((item: any, cardIndex: number) => (
        <TouchableOpacity
          key={cardIndex}
          onPress={() =>
            item.title === 'Uniswap'
              ? navigation.navigate('bottomScreen')
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
);

const styles = StyleSheet.create({
  sectionTitle: {
    color: Colors.white,
    fontSize: 22,
    fontWeight: '400',
    marginBottom: 12,
    marginHorizontal: wp('4%'),
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
    marginBottom: 20,
    marginHorizontal: 5,
  },
});

export default SectionBlock;
