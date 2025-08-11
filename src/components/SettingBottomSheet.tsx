import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native'
import { Images } from '../assets' 
import { settingsData } from '../mock/settingsData'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AppNavigatorParamList } from '../navigators/routeNames'


const SettingBottomSheet = ({ onClose }: { onClose: () => void, }) => {

const navigation = useNavigation<NativeStackNavigationProp<AppNavigatorParamList>>()

const handleItemPress = (route?: keyof AppNavigatorParamList) => {
  if (route) {
    onClose()
    navigation.navigate(route as any )
  }
}


  const renderItem = ({ item }: any) => (
    <View style={styles.item}>
      <Image source={item.icon} style={styles.icon} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
       <TouchableOpacity onPress={() => handleItemPress(item.route)}>
       
      <Image source={Images.forward} style={styles.arrow} />
      </TouchableOpacity>
    </View>
  )

  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.sheetTitle}>Settings</Text>

      <FlatList
        data={settingsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        contentContainerStyle={{ paddingBottom: 30 }}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity >
          <Text style={styles.delete}>Delete Account</Text>
      </TouchableOpacity>

    </View>
  )
}

export default SettingBottomSheet

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    backgroundColor: '#01032C',
  //  borderTopLeftRadius: 20,
    //borderTopRightRadius: 20,
  },
  sheetTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 20,
    justifyContent:"center",
    textAlign:"center"
  },
  item: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  icon: {
    width: 17,
    height: 24,
    marginRight: 16,
    marginTop: 0,
    // resizeMode:'contain',
  },
  itemTitle: {
    color: 'white',
    fontSize: 15,
    fontWeight: '500',
  },
  itemSubtitle: {
    color: '#ADD2FD',
    fontSize: 13,
    marginTop: 2,
  },
  arrow: {
    width: 12,
    height: 12,
   resizeMode:'contain',
    marginLeft: 10,
    marginTop: 10,
  },
  delete: {
   // color: '#F24444',
 //   textAlign: 'center',
 color:'white',
    fontSize: 12,
    fontWeight: '500',
    paddingVertical: 16,
  },
line: {
  alignSelf: 'center',
  width: 50,
  height: 4,
  borderRadius: 4,
  backgroundColor: '#183460', 
  marginBottom: 12,
},
})
