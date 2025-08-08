import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text, TouchableOpacity,Image } from 'react-native'
import { Images } from '../../assets'
import AppHeader from '../../components/AppHeader'
import MySecurityScore from '../../components/MySecurityStore'
import SecurityOptionItem from '../../components/SecurityOptionItem'
import { securityOptions } from '../../mock/securityOptions'
import type { SecurityOption } from '../../mock/securityOptions'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../../navigators/routeNames'



const SecurityScreen = () => {

   const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()
  const [biometricsEnabled, setBiometricsEnabled] = useState(false)
  const [activeTicks, setActiveTicks] = useState<{ [key: string]: boolean }>({})

  const toggleTick = (title: string) => {
    setActiveTicks((prev) => ({
      ...prev,
      [title]: !prev[title],
    }))
  }

  const handleNavigate = (route: keyof AppNavigatorParamList) => {
    navigation.navigate(route as any)
  }


  return (
    <View style={styles.container}>
 
      
      <View style={styles.component}>
        <AppHeader title="Security"  />
        <MySecurityScore score={1} />
      </View>

      <FlatList
        data={securityOptions} 
       renderItem={({ item }: { item: SecurityOption }) => (
  <SecurityOptionItem
    item={item}
    isActive={!!activeTicks[item.title]}
    onToggleTick={() => toggleTick(item.title)}
    biometricsEnabled={biometricsEnabled}
    setBiometricsEnabled={setBiometricsEnabled}
     onNavigate={handleNavigate} 
  />
)}

        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
      />
      <View style={styles.seedPhrase}>
      <Image source={Images.questionmark}  />
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
    bottom:10,
  }
})
