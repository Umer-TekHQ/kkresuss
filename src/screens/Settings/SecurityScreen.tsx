import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { Images } from '../../assets';
import AppHeader from '../../components/AppHeader';
import MySecurityScore from '../../components/MySecurityStore';
import SecurityOptionItem from '../../components/SecurityOptionItem';
import { securityOptions } from '../../mock/securityOptions';
import { AppNavigatorParamList } from '../../navigators/routeNames';
import { RootState } from '../../store';
import { setTicks, toggleTick } from '../../store/slices/securitySlice';
import { Colors } from '../../theme/colors';

import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { SecurityOption } from '../../mock/securityOptions';


const SecurityScreen = () => {
 const dispatch = useDispatch();
    const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
    const activeTicks = useSelector((state: RootState) => state.security.ticks);
    const email = useSelector((state: RootState) => state.user.email);
    const [score, setScore] = useState(0);
    const [biometricsEnabled, setBiometricsEnabled] = useState(false)
 useEffect(() => {
    if (email && !activeTicks['Email']) {
      dispatch(setTicks({ ...activeTicks, Email: true }));
    }
  }, [email]);
  const handleToggleTick = (title: string) => {
    dispatch(toggleTick(title));
  };
  useEffect(() => {
  setScore(1);
}, [activeTicks]);
  const handleNavigate = (route: keyof AppNavigatorParamList) => {
    navigation.navigate(route as any)
  }
  return (
    <View style={styles.container}>   
      <View style={styles.component}>
        <AppHeader title="Security"  />
        <MySecurityScore score={score} />
      </View>
      <FlatList
        data={securityOptions} 
       renderItem={({ item,index }: { item: SecurityOption,  index: number }) => (
    <SecurityOptionItem
      item={item}
      index={index}
      isActive={!!activeTicks[item.title]}
      onToggleTick={() => handleToggleTick(item.title)}
      biometricsEnabled={biometricsEnabled}
      setBiometricsEnabled={setBiometricsEnabled}
      onNavigate={handleNavigate} 
      totalItems={securityOptions.length}
    />
)}

        keyExtractor={(item) => item.title}
        contentContainerStyle={styles.contentContainer}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
      <View style={styles.seedPhrase}>
        <TouchableOpacity style={styles.whyText}>
      <Image source={Images.questionMark} style={styles.question} />
        <Text style={styles.whyQuestion}>Why no seed phrases?</Text>
      </TouchableOpacity>
      </View>
    </View>
  )
}
export default SecurityScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background6,
  },
  component: {
    paddingBottom: 20,
  },
  whyText: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent:'center',
    flexDirection: 'row', 
  },
  separator:{
    height: 20 
  },
  contentContainer:{
    paddingHorizontal: 20
  },
  whyQuestion: {
    color: Colors.white,
    fontSize: 14,
    marginLeft: 10,
  },
  seedPhrase:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    bottom:20,
  },
  question:{
    width: 18,
    height: 18
  }
})
