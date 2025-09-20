import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Projects } from "./Projects";
import { ProjectsList } from "./ProjectsList";

const ProjectsSection = () => (
  <View>
    <Text style={styles.title}>Projects to Try</Text>
    <Projects />
    <ProjectsList />
  </View>
);

const styles = StyleSheet.create({
  title: {
    color: '#7AB7FD',
    fontSize: 16,
    marginTop: 4,
    marginLeft: 15,
    marginBottom: 5,
  },
});

export default ProjectsSection;
