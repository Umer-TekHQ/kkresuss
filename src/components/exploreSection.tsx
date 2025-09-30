import React from 'react';
import { StyleSheet, View } from 'react-native';


import SectionBlock from "./sectionBlock";

type Props = {
  exploreSections: any[];
  onSectionLayout: (name: string, event: any) => void;
  navigation: any;
};

const ExploreSections = ({ exploreSections, onSectionLayout, navigation }: Props) => (
  <View style={{ marginTop: 20 }}>
    {exploreSections.map((section, sectionIndex) => (
      <SectionBlock
        key={sectionIndex}
        section={section}
        onSectionLayout={onSectionLayout}
        navigation={navigation}
      />
    ))}
    <View style={styles.spacer} />
  </View>
);

export default ExploreSections;

const styles = StyleSheet.create({
  spacer:{ height: 200 }
})
