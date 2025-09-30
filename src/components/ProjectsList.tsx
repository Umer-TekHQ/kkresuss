import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { DATA } from '../mock/projects';
import { Colors } from '../theme/colors';

type DataProject = typeof DATA[0];

export const ProjectsList: React.FC = () => {
  const [projects, setProjects] = useState<DataProject[]>([]);

  useEffect(() => {
    setProjects(DATA);
  }, []);

  const renderItem = ({ item }: { item: DataProject }) => (
    <View style={styles.card}>
      <Image source={item.logo} style={styles.logo} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <View style={styles.row}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Launch</Text>
      </TouchableOpacity>
    </View>
  );

  return (
      <FlatList
       data={projects}
       renderItem={renderItem}
       keyExtractor={(item) => item.id}
       scrollEnabled={false} 
       contentContainerStyle={styles.container}
       />

  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 110,
    marginRight: 8,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: Colors.fieldBorder,
    paddingBottom: 15,
    paddingRight: 15,
    marginVertical: 8,
    marginRight: 5,
    width: '95%',
    marginLeft: 15,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 12,
    resizeMode: 'contain',
    marginBottom: 15,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: Colors.white,
    flexWrap: 'wrap',
    height: 40,
    width: '83%',
    fontSize: 14,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  label: {
    backgroundColor: Colors.fieldBorder,
    display: 'flex',
    flexWrap: 'wrap',
    color: Colors.lightblue,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 8,
    fontSize: 12,
  },
  name: {
    color: Colors.lightblue,
    fontSize: 13,
  },
  button: {
    backgroundColor: Colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    borderColor: Colors.blue,
    borderWidth: 1.5,
  },
  buttonText: {
    color: Colors.white,
    fontWeight: '600',
    fontSize: 13,
  },
});
