import { useNavigation } from '@react-navigation/native'
import React, { useState ,useEffect} from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity,Image } from 'react-native'
import { useSelector,useDispatch  } from 'react-redux';

import { Images } from '../../assets'
import AppHeader from '../../components/AppHeader'
import MySecurityScore from '../../components/MySecurityStore'
import SecurityOptionItem from '../../components/SecurityOptionItem'
import { securityOptions } from '../../mock/securityOptions'
import { AppNavigatorParamList } from '../../navigators/routeNames'
import { RootState } from '../../store';
import { setTicks, toggleTick } from '../../store/slices/securitySlice';

import type { SecurityOption } from '../../mock/securityOptions'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'


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
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      <View style={styles.seedPhrase}>
      <Image source={Images.questionMark}  />
      <TouchableOpacity style={styles.whyText}>
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
    backgroundColor: '#010D2A',
  },
  component: {
    paddingBottom: 20,
  },
  whyText: {
    marginTop: 0,
    alignItems: 'center',
    justifyContent:'center',
    
  },
  whyQuestion: {
    color: '#FFFFFF',
    fontSize: 15,
  
  },
  seedPhrase:{
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    bottom:22,
  }
})
