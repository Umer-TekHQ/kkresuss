import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { DATA } from '../mock/projects';

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
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderColor: '#1b57cf',
    paddingBottom: 15,
    paddingRight: 15,
    marginVertical: 8,
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
    color: '#fff',
    flexWrap: 'wrap',
    height: 40,
    width: '85%',
    fontSize: 14,
    fontWeight: 'bold',
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
    alignItems: 'center',
  },
  label: {
    backgroundColor: '#0734A9',
    display: 'flex',
    flexWrap: 'wrap',
    color: '#ADD2FD',
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: 4,
    marginRight: 8,
    fontSize: 12,
  },
  name: {
    color: '#ADD2FD',
    fontSize: 13,
  },
  button: {
    backgroundColor: '#0a0a23',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 15,
    borderColor: '#4898F3',
    borderWidth: 1.5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
